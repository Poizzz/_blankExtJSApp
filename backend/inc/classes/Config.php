<?php
class Config {

    const PATH_CONFIG            = "../config/";
    
    const CONFIG_MAIN            = "config-main.json";


    public  static $jsonconfig = [];
    private static $msg = [];


    function __construct(){
        autoloader("Utils");
    }

    /**
    * @remotable
    */
    public static function get($type){
        // Получение "главных" конфигов
        if(isset(self::$jsonconfig[$type]))
            return Utils::msgSuccess (self::$jsonconfig[$type]);

        switch ($type){
            case "Main"    : $file_path = self::PATH_CONFIG.self::CONFIG_MAIN; break;
            default: return Utils::msgErr("Ошибка выбора типа конфигурационного файла '".$type."'. ");
        }
        
        $conf = Utils::getJsonFile($file_path);

        if($conf['success']){
            //Including файлов конфига
            self::includeConfigR($conf['result']);
            // Доп. обработка параметров
            $method = "parceConfig".$type;
            if(method_exists(get_called_class(),$method))
                $conf['result'] = self::$method($conf['result']);
        }
        self::$jsonconfig[$type] = $conf['result'];
        return Utils::returnResult($conf['result']);
    }

    // Доп обработка параметров ConfigMain
    private static function parceConfigMain($conf){

        // Получение рабочей директории
        $path_arr = explode("/",getcwd());
        array_pop($path_arr);
        $work_dir = implode ( "/" , $path_arr)."/";

        // Обработка путей директорий
        foreach( $conf['paths'] as $type => $data ){
            $conf['paths'][$type] = self::preparePath ( $data, $work_dir  );
        }

        // Обработка путей файлов
        foreach( $conf['files'] as $type => $value ){
            if($value[0] !== "/"){
                $conf['files'][$type] = $work_dir.$value;
            }
        }

        return $conf;
    }

    private static function preparePath ( $data, $work_dir ){
        $out = [];
        foreach( $data as $param => $value ){
            if( is_array($value) ){
                $out[$param] = self::preparePath ( $value, $work_dir );
                //continue;
            }
            elseif( substr($value, 0,7) === "http://" ){
                $out[$param] = $value;
                //$conf['paths'][$type][$param] = str_replace("http://", "http//", $value);
            } else{
                if( substr($value, -1) !== "/" ){
                    $value .= "/";
                }
                if($value[0] !== "/"){
                    $value = $work_dir.$value;
                }
                $out[$param] = $value;
            }

        }
        return $out;
    }

    //Вставка Include json конфигов
    private static function includeConfigR (&$conf){
        foreach($conf as $key => $val){
            if($key === "include"){
                if(!is_array($val)) $val = [$val];
                foreach ($val as $path_str){
                    $path_arr = explode("/",$path_str);
                    $inc_conf = Utils::getJsonFile(self::PATH_CONFIG_INC.$path_arr[0]);
                    if($inc_conf['success']){
                        $inc_conf = $inc_conf['result'];
                        $count_level = count($path_arr)-1;
                        if($count_level>0){
                            for($i=1; $i<=$count_level; $i++){
                                if(isset($inc_conf[$path_arr[$i]]))
                                    $inc_conf = $inc_conf[$path_arr[$i]];
                                else 
                                    return Utils::msgErr("Ошибка параметра include '".$val."' (".$path_arr[$i].")");
                            }
                        }
                        $conf = $conf+$inc_conf;
                    }
                }
                unset($conf[$key]);
                break;
            }
            else{
                if(is_array($val))
                    self::includeConfigR($conf[$key]);
            }    
        }
    }

}
?>