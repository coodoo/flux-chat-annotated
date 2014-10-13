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

var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var MessageStore = require('../stores/MessageStore');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  /**
   * 這裏收到 view 元件傳來的新值，接著要做三件事
   */
  createMessage: function(text) {
  	// 1. 立即廣播出去，讓 Store 拿到新值，並進而觸發 view 更新
  	// 這招在 flux 裏叫 optimistic update，也就是我們假設這條新訊息一定可以成功被存入 server
  	// 因此先讓 client view 更新，但也因此，如果最後儲存失敗，就要想辦法 rollback view 狀態
  	// 這點在範例中沒演示
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MESSAGE,
      text: text
    });

    // 2. 這裏操作 MessageStore 身上的 public method 生成一個 message 物件
    // 將來好回存 server。
    // 
    // 特別注意：由 actionCreator 操作 Store 身上指令，是最新出現的手法，也沒有標示在流程圖內，
    // 但它是極為重要的技巧。
    var message = MessageStore.getCreatedMessageData(text);

    // 3. 操作 APIUtils 物件將 message 回存 server
    ChatWebAPIUtils.createMessage(message);
  }

};
