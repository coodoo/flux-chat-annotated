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

var React = require('react');
var MessageStore = require('../stores/MessageStore');
var ThreadListItem = require('../components/ThreadListItem.react');
var ThreadStore = require('../stores/ThreadStore');
var UnreadThreadStore = require('../stores/UnreadThreadStore');

/**
 * 注意這支是在 createClass() 之外，因此它是一個 module-level 的 method
 * 在這個 module 內它是可全域存取的，這在 node module 裏是常見手法
 */
function getStateFromStores() {
  return {
    threads: ThreadStore.getAllChrono(),
    currentThreadID: ThreadStore.getCurrentID(),
    unreadCount: UnreadThreadStore.getCount()
  };
}

/**
 * 建立元件
 */
var ThreadSection = React.createClass({

  // 元件初始化時會執行這支指令一次，取回該元件需要的資料
  // 這裏只是手法更乾淨一點，轉手由 getStateFromStores() 操作，
  // 原因是 getStateFromStores() 可能會由很多地方呼叫
  getInitialState: function() {
    return getStateFromStores();
  },

  // didMount 時代表元件已掛載到 DOM 上，準備被用戶操作，
  // 因此要盡快開始偵聽各種事件，此例中它只偵聽了兩個 Store 的 change 事件
  componentDidMount: function() {
    ThreadStore.addChangeListener(this._onChange);
    UnreadThreadStore.addChangeListener(this._onChange);
  },

  // 有掛偵聽就要記得自已善後，
  // 因此在元件即將 unmount(從 DOM 中移除前)，就要清掉早先掛在 Stores 身上的偵聽
  componentWillUnmount: function() {
    ThreadStore.removeChangeListener(this._onChange);
    UnreadThreadStore.removeChangeListener(this._onChange);
  },

  /**
   * 這支是元件的核心指令，負責繪出畫面
   */
  render: function() {

    // 注意元件內一律依靠外界傳入的資料來繪圖
    // 外界傳入資料的方式有兩種
    // 1. 透過 this.props.XXX
    // 2. 透過 this.state{}
    // 
    // 下例是透過 this.state 來取值
    // 並且跑一次 map() 轉換資料內容成方便使用的格式
    // 注意：threadListItems 是個 Array
    var threadListItems = this.state.threads.map(function(thread) {
      
      // 下面是 react 元件常見的操作技巧
      // 
      // 它將每筆 thread 物件，轉生成一個 <ThreadListItem> 元件
      // 這種就是 jsx 語法，並且注意 {...} 這種 binding 語法，
      // 並且注意它傳了三個 prop 進去，分別是 key, thread, currentThreadID，
      // 將來在 <ThreadListItem> 裏就是透過 this.props.thread 來取用
      // 
      // 當這個 map() 跑完後，threadListItems[] 的內容就會是一包 <ThreadListItem> 物件
      // 而不再是原先的 thread 物件了
      // 
      // 要接著進去看 ThreadListItem 子元件裏面寫了什麼
      return (
        <ThreadListItem
          key={thread.id}
          thread={thread}
          currentThreadID={this.state.currentThreadID}
        />
      );
    }, this);

    // 下面也是依 this.state 內的資料，動態決定畫面上要顯示哪些東西
    // 例如 unreadCount 為 0 時，就不顯示東西，因此傳 null
    // 反之就用 jsx 語法寫一個子元件，並綁定正確的 count 數值   
    var unread =
      this.state.unreadCount === 0 ?
      null :
      <span>Unread threads: {this.state.unreadCount}</span>;

    // 當上面將所有準備工作都完成後
    // 最終的 return 就要將所有東西組合起來，一次返還出去以供繪到 DOM 上
    // 特別注意下面 {unread} 與 {threadListItems} 兩個物件的用法
    // 以及 <ul> 這段，它裏面每筆資料的 <li> 元素是寫在 <ThreadListItem> 子元件裏的。
    // 
    // 搞懂這整段的處理，react 大概就學完八成了。  
    return (
      <div className="thread-section">
        <div className="thread-count">
          {unread}
        </div>
        <ul className="thread-list">
          {threadListItems}
          </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   *
   * 根據「一律重繪」原則
   * 當元件聽到 Store (model) 內容變時，最直接的反應就是
   * 1、重新取得 Store 最新的值
   * 2、設入自身的 state 物件
   * 3、然後重繪整個畫面
   *
   * 下面就是在做 #1 與 #2 的事，
   * 它操作 getStatesFromStores() 指令取回一包最新資料
   * 並且透過 setState() 將新資料存入 this.state 物件
   * 這個操作就會觸發元件在下一輪重繪，畫面也就成功更新了
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ThreadSection;
