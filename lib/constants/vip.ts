export const VIP_18_COOKIE_NAME = "vip18";
export const VIP_18_COOKIE_ALLOWED_VALUE = "yes";
export const VIP_18_COOKIE_DENIED_VALUE = "no";

export const VIP_QUERY_PARAM_VERIFY = "verify";
export const VIP_QUERY_PARAM_DENIED = "denied";

export const VIP_DENIED_MESSAGE = "Сюда нельзя. VIP доступ только для 18+.";

export type VipQueryParam = typeof VIP_QUERY_PARAM_VERIFY | typeof VIP_QUERY_PARAM_DENIED;
