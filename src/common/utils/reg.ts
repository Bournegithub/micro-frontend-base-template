// 用户名 8-16位，只能包含数字/字母/下划线
export const checkUserName = /^[a-zA-Z0-9_]{8,16}$/;

// 密码 8-16位，至少1个大写字母，1个小写字母，1个数字和1个特殊字符
export const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?.&_-])[\w$@$!%*?.&-]{8,16}/;

//Email正则
export const checkEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//手机号正则
export const checkMobile = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;

//身份证号（18位）正则
export const checkIDNumber = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;