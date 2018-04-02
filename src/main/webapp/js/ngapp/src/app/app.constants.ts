export class AppConstants {

    // Token related data
    public static TOKEN_URL = 'http://localhost:8080/token';

    // Vehicle show data
    public static VEHICLE_SHOWALL_URL = 'http://localhost:8080/api/showall';
    public static VEHICLE_SHOWALL_DISABLED_URL = 'http://localhost:8080/api/showall/disabled';
    public static VEHICLE_SHOW_BY_ID_URL = 'http://localhost:8080/api/showone/vehicle?id=';
    public static VEHICLE_SHOW_MARK_URL = 'http://localhost:8080/api/showall/mark';
    public static VEHICLE_SHOW_MODEL_URL = 'http://localhost:8080/api/showall/model';
    public static VEHICLE_SHOW_FILE_BY_VEHICLE_ID_URL = 'http://localhost:8080/api/showone/file?id=';
    public static VEHICLE_SHOW_FILE_BY_FILE_ID_URL = 'http://localhost:8080/api/showone/download/file?id=';
    public static VEHICLE_GET_LENGTH_URL = 'http://localhost:8080/api/showall/length';

    // Vehicle add data
    public static VEHICLE_ADD_MARK_URL = 'http://localhost:8080/api/add/mark';
    public static VEHICLE_ADD_MODEL_URL = 'http://localhost:8080/api/add/model';
    public static VEHICLE_ADD_FILE_BY_VEHICLE_ID_URL = 'http://localhost:8080/api/upload/file';
    public static VEHICLE_UPLOAD_URL = 'http://localhost:8080/api/upload';
    public static VEHICLE_ENABLE_URL = 'http://localhost:8080/api/enable/vehicle';

    // Vehicle edit data
    public static VEHICLE_EDIT_URL = 'http://localhost:8080/api/edit/vehicle';
    public static VEHICLE_EDIT_MARK_URL = 'http://localhost:8080/api/edit/mark';
    public static VEHICLE_EDIT_MODEL_URL = 'http://localhost:8080/api/edit/model';

    // Vehicle misc data
    public static VEHICLE_BYTEARRAY_TO_STRING_CONVERT_URL = 'http://localhost:8080/api/vehicle/convert';
    public static VEHICLE_GEARBOX_TYPE_ARRAY = ['Automatic', 'Manual'];

    // Vehicle delete data
    public static VEHICLE_REMOVE_MODEL_URL = 'http://localhost:8080/api/remove/model';
    public static VEHICLE_REMOVE_MARK_URL = 'http://localhost:8080/api/remove/mark';
    public static VEHICLE_REMOVE_URL = 'http://localhost:8080/api/remove/vehicle';
    public static VEHICLE_DISABLE_URL = 'http://localhost:8080/api/disable/vehicle';
    public static VEHICLE_DISABLE_FILE_BY_ID_URL = 'http://localhost:8080/api/vehicle/file/disable';

    // User related data
    public static USER_SHOW_DETAILS_URL = 'http://localhost:8080/api/users/data';
    public static USER_ROLE_ARRAY = ['user', 'admin'];
    public static USER_UPDATE_BY_ID_URL = 'http://localhost:8080/api/users/data/update';
    public static USER_REMOVE_BY_ID_URL = 'http://localhost:8080/api/users/data/remove';
    public static USER_ADD_NEW_URL = 'http://localhost:8080/api/users/new';
}
