/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var ChatServerActionCreators = require('../actions/ChatServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

/**
 * WebAPIUtil 
 * 負責代表 client 與 backend 通訊的元件，
 * 一般就是呼叫遠方 REST API, 
 * 但在這裏為了簡化範例，因此都是從 localStorage 裏撈資料，模擬 ajax 通訊有成功拿到結果
 */
module.exports = {

  /**
   * app 一啟動時就會呼叫，取回一包初始資料
   */
  getAllMessages: function() {

    // 這段操作原本應該是 $.ajax() 發出一個 GET 請求從 REST end point 拉回資料
    // simulate retrieving data from a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));

    // simulate success callback
    ChatServerActionCreators.receiveAll(rawMessages);
  },

  /**
   * 將用戶新建入的訊息回存 server
   */
  createMessage: function(message, threadName) {
    // 這段原本應該是 $.post() 傳一包訊息給 REST end point
    // simulate writing to a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp
    };
    rawMessages.push(createdMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));

    // 模擬網路傳輸要花費幾秒中，因此拖慢一下
    // simulate success callback
    setTimeout(function() {
      // 重點是，當 $.ajax() 成功後，就透過 actionCreator 發出新事件通知系統
      // 接著 Store 會更新，然後 view 也會更新
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }, 0);
  }

};
