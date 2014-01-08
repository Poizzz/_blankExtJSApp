<?php

$Config = new Config();

class Config{

	private $filename = "../config/config-main.json";
	public $conf = null;

	function __construct(){
		$this->getConfig();
	}

	private function getConfig(){
		if(!is_file($this->filename)){
			$this->msgErr("File missing '".$this->filename."'.");
			return false;			
		}
		$handle = fopen($this->filename, "r");
		$json = fread($handle, filesize($this->filename));
		
		fclose($handle);
		$json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t](//).*)#", '', $json); 
		/*if(version_compare(phpversion(), '5.4.0', '>=')) {			
			$conf = json_decode($json, $assoc, $depth, $options); 
		} 
		elseif(version_compare(phpversion(), '5.3.0', '>=')) {
		    $conf = json_decode($json, $assoc,); 
		} 
		else { 
		    $conf = json_decode($json, $assoc); 
		}*/
		$conf = json_decode($json, false); 
		if($conf !== NULL){
			foreach($conf->result->path as $key=>$item){
				if($item[0] === "/")
					$item = substr($item, 1);
				if(substr($item, -1) !== "/")
					$item = $item."/"; 
				$conf->result->path->{$key} = $item;
				//$this->msg[] = $conf->result->path->{$key};
			}
			$this->conf = $conf->result;
			return true;	
		}
		else{
			Utils::msgErr("Ошибка в настройке конфигурационного файла '".$this->filename."'.");
			return false;
		}			
		//var_dump($conf);
	}

}