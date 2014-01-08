<?php
class Base {

    protected static $_instance;

    static public $conn = null;

	private function __construct(){
        autoloader("Utils");
        autoloader("Config");

        Config::get('DB');

		self::connect();
	}
	
    private function __clone(){
    }

    public static function getInstance() {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

	public static function connect (){
        if(!isset(Config::$jsonconfig['DB'])){
            return false;
        }
		if(self::$conn === null){
			self::$conn = pg_connect("host=".Config::$jsonconfig['DB']['database']['HOST'].
                " port=".Config::$jsonconfig['DB']['database']['PORT'].
                " user=".Config::$jsonconfig['DB']['database']['USER'].
                " password=".Config::$jsonconfig['DB']['database']['PASS']);

        }
	}

}

Base::getInstance();

?>