<?php
class Auth {

    function __construct() {
        autoloader("Utils");
        autoloader("Base");
    }


    /**
    * @remotable @formHandler
    */
    public function login ($data = []) {

        if ( ! (isset($data['j_username']) && isset($data['j_password'])) )
            return Utils::msgErr("Отстутствует имя пользоваветля или пароль");

        $login = $data['j_username'];
        $md5 = md5( $data['j_password'] );

        $users[] = [
            'user_id'       => 1,
            'firstname'     => $login,
            'login'         => $login,
            'rights'        => 255
        ];

        // $sql = "SELECT * FROM users WHERE login='".$login."' AND md5='".$md5."' AND deleted_id is null";
        // $result = pg_query(Base::$conn, $sql);
        
        // if(!$result) {
        //     return Utils::msgErr("Error SQL: ".$sql);
        // }

        //while ($user = pg_fetch_array($result, NULL, PGSQL_ASSOC )) {
        foreach($users as $user){

            $session_data = array(
                'user_id'       => $user['user_id'],
                'user_name'     => $user['firstname'],
                'user_login'    => $user['login'],
                'user_rights'   => $user['rights']
            );
            $_SESSION['user_data'] = $session_data;

            $cookie_data = [];
            foreach ($session_data as $key => $val) {
                $cookie_data[$key] = str_replace('\\', '{{slash}}', $val);
            }

            setcookie( 'user_data', md5(serialize($cookie_data)), time() + (60*60*24), "/");

        }

        if(!isset($session_data)) {
            return Utils::err403("Неверное имя пользователя или пароль");
        }

        return Utils::msgSuccess($session_data);

        return FALSE;

    }

    /**
    * @remotable
    */
    public function logout () {
        $this->del();
        return Utils::err403("No login");
    }

    /**
    * @remotable
    */
    public function remoteCheckLogin () {
        return (self::checkLogin() === true)
            ?  Utils::msgSuccess($_SESSION['user_data'])
            :  Utils::err403("No login");
    }

    public static function checkLogin () {
        $cookie_data = [];

        if(!isset($_SESSION['user_data'])){
            return false;
        }

        foreach ($_SESSION['user_data'] as $key => $val) {
            $cookie_data[$key] = str_replace('\\', '{{slash}}', $val);
        }

        if ( md5(serialize($cookie_data)) === $_COOKIE['user_data']) {
            return true;
        } else {
            $this->del();
            return false;
        }
    }

    private function del () {
        unset($_SESSION['user_data']);
        setcookie( 'user_data', "", time() - (60*60*24), "/");
        return true;
    }


}
?>