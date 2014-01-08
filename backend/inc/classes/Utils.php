<?php
class Utils {

    public static $msg = [];

    function __construct(){

    }

    /**
    * @remotable
    */
    public static function getFile($file_path){
        $content = '';

        // Удаленный файл
        if(strstr($file_path, "http:") !== false){
            $file = @fopen ($file_path, "r");
            if (!$file) 
                return self::msgErr("Не найден url '".$file_path."'");
            

            while (!feof($file)) {
                  $content .= fread($file, 8192);
            }

            fclose($file);
        }

        // Локальный файл
        else{
            if(!is_file($file_path)){
                return self::msgErr("Не найден файл '".$file_path."'");
            }

            $content = file_get_contents($file_path);

        }
        
        return self::returnResult($content);
    }

    /**
    * @remotable
    */
    public static function getJsonFile($file_path){
        
        $json = self::getFile($file_path)['result'];

        $json = self::clerJson($json);
        
        $data = json_decode($json, true);
        if($data === NULL){
            return self::msgErr("Ошибка в формате файла '".$file_path."'. ".json_last_error_msg());
        }
        return self::returnResult($data);
    }

    ## Чистка json
    public static function clerJson($json){
        
        // Убрать комментарии
        $json = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t](//).*)#", '', $json);
       
        //Убрать  запятые перед } (trailing commas)
        $json=preg_replace('/,\s*([\]}])/m', '$1', $json); 

        return $json;
    }

    ## Подстановка переменных в строка шаблона
    public static function applyTpl($tpl, $vars = []){
        foreach ($vars as $k=>$v){
            $tpl = str_replace("{".$k."}",$v,$tpl);
        }
        return $tpl;
    }

    ## Список директорий по заданному пути
    public static function listDir( $path ){
        $result = array();
        $content = @scandir($path);
        if($content !== false){
            $list = array_diff( @scandir( $path ), array('.','..'));
            foreach( $list as $filename ){
                if ( is_dir( $path.$filename )){
                    $result[] = $filename;
                }
            }
        }
        return $result;
    }

    ## Рекурсивное копирование директории
    public static function copyDir( $source, $dest ){
        if (!is_dir($source)) {
            return false;
        }

        if(!is_dir($dest)){
            mkdir($dest);
        }

        $objects = scandir($source);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                $path = $source . '/' . $object;
                if( is_file($path) ){
                    if(!@copy($path, $dest . '/' . $object)) {
                        return false;
                    }
                } 
                elseif( is_dir($path) ){
                    if(!self::copyDir($path, $dest . '/' . $object)){
                        return false;
                    }
                }
            }
        }
        reset($objects);

        return true;
    }

    ## Рекурсивное удаление директории
    public static function delDir( $dir, $clear = false ){
        if (!is_dir($dir)) {
            return false;
        }

        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                $path = $dir."/".$object;
                if(is_link($path) && $clear){
                    continue;
                }
                if ( is_dir($path) ) {
                    self::delDir($path); 
                } else {
                    unlink($path);
                }
            }
        }
        reset($objects);
        if(!$clear){
            rmdir($dir);
        }
        return true;
    }

    public static function msgErr($text = '', $code = 500){
        self::$msg[] = $text;
        //error_log($text);
        //header('content-type: text/json; charset=utf-8');
        return ["success" => false,  "code" => $code, "msg" => $text];
    }

    public static function err403( $text = 'No login'){
        self::$msg[] = $text;
        //header('content-type: text/json; charset=utf-8');
        //header("HTTP/1.1 403 Unauthorized" );
        return ["success" => false, "code" => 403 ,"msg" => $text];
    }

    public static function msgSuccess($data){
        //header('content-type: text/json; charset=utf-8');
        return ["success"=>true, "result"=> $data];
    }

    public static function returnResult($res){
        if(self::$msg)
            return self::msgErr(implode(",", self::$msg));
        return self::msgSuccess($res);
    }
}
?>