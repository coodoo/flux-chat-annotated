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

var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var React = require('react');

var ENTER_KEY_CODE = 13;

var MessageComposer = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  // 這裏特別注意 onChange() 時發生的事
  /**
   * 這裏三點特別注意
   *
   * 1. <textarea> 的 value 是綁定到 this.state.text，這在 react 裏叫 controlled component
   *   - 細節在此：http://facebook.github.io/react/docs/forms.html#controlled-components
   *
   * 2. 每次當用戶輸入新值時，會觸發 onChange handler，請注意看那段的解釋
   *
   * 3. onKeyDown handler 則是單純在判定是否為按下 enter 鍵，要送出新訊息
   */
  render: function() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    );
  },

  // 由於 <textarea> 內容是綁定到 this.state.text 身上，
  // 因此用戶輸入的新值是不會顯示在畫面上的，一定要先將新的值放回 this.state.text 屬性內，
  // 進而觸發元件重繪，然後透過 binding 顯示到 textarea 內
  // 這是元件內需要 this.state 最常見的理由
  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  /**
   * 判斷是否按下 enter 鍵，要送出資訊
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        // 送出資訊的方式同樣是操作 actionCreator 身上的指令，並將新值傳送出去。
        // 特別注意這支 createMessage() 的後續處理非常重要，需徹底理解。
        ChatMessageActionCreators.createMessage(text);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;
