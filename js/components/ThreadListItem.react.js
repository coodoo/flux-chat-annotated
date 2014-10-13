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
 *
 * @jsx React.DOM
 */

// 注意這裏開始取用 ActionCreator，代表這個元件可能會操作遠方 REST API，或需要對系統廣播事件
var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var React = require('react');

// 這是一個處理 css className 的插件，細節在此
// http://facebook.github.io/react/docs/class-name-manipulation.html
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;

var ThreadListItem = React.createClass({

  // 這是在宣告 this.props.XXX 每個屬性的 type
  // 一般不會寫，但寫了算是好孩子
  propTypes: {
    thread: ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string
  },

  // 又是核心指令，要繪出元件
  render: function() {

    // 重要：這裏就是透過 this.props.XXX 取用外界傳入的參數
    // 如果忘了，請回頭看 ThreadSection.react.js 裏面 render() 那段的說明
    // 也順便回想，元件有兩種方式從外界取得資料，一種是 this.props，另一種是 this.state
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;

    // 下面最終就是反還一個 <li> 元素，身上帶會各種樣式與屬性
    // 特別注意 cx() 插件的用法，它是為了方便透過 logic 切換某些樣式是否顯示
    // 
    // 另外注意 onClick='' 這句，這是 react 處理 event handler 的標準手法
    return (
      <li
        className={cx({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID
        })}
        onClick={this._onClick}>
        <h5 className="thread-name">{thread.name}</h5>
        <div className="thread-time">
          {lastMessage.date.toLocaleTimeString()}
        </div>
        <div className="thread-last-message">
          {lastMessage.text}
        </div>
      </li>
    );
  },

  /**
   * react 其實沒有使用 _ 命名的傳統，這是 Bill 的個人習慣
   * 這段重點在：當有人點選一個 <li> elem 時，它要對系統發出事件，
   * 而標準手法就是操作 actionCreator 身上的指令，並且傳入相關參數, 
   * 對 view 來說，完成這步後，就可射後不理，
   * 它只要靜靜等待下一次 Store 廣播 change 事件再重繪就好
   */
  _onClick: function() {
    ChatThreadActionCreators.clickThread(this.props.thread.id);
  }

});

module.exports = ThreadListItem;
