
/**
* @params success Boolean 是否成功
* @params message String 返回的消息
 * @params data String 返回的数据
 */

module.exports.reply = (success, message = '', data = null ) => {
  return {
          success,
          data,
          message
        }
}
