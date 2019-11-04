import moment from 'moment';
import atob from 'atob';

export function getLastUpdated(time) {
    return moment(time).fromNow();
}
export const noop = () => {};

/**
 * 解码base64的内容
 * @param str 要解码的内容
 */
export function b64ToUtf8(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (error) {
        console.error('base64ToUtf8-Error:', str);
    }
}
