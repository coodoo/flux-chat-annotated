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

// 將整支 app 會用到的 event type 整理在一份 js 中是很重要的技巧
// 一來避免直接寫字串散落在程式各部份，
// 二來可避免相同事件名稱出現兩次
var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
  
  // 這是由 ThreadListItem.react.js 過來呼叫的
  // 傳入 threadID 後即可轉手操作 dispatcher 廣播出去，
  // 然後 Store 就會聽到，
  // 此例中，將來是 	
  clickThread: function(threadID) {
    ChatAppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  }

};
