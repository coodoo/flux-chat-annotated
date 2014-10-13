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

// This file bootstraps the entire application.

var ChatApp = require('./components/ChatApp.react');
var ChatExampleData = require('./ChatExampleData');
var ChatWebAPIUtils = require('./utils/ChatWebAPIUtils');
var React = require('react');

// 這行 production 時可拿掉
window.React = React; // export for http://fb.me/react-devtools

// 餵假資料到 localStorage 
ChatExampleData.init(); // load example data into localstorage

// 發動第一次請求，取回聊天訊息
// 所有遠端通訊工作都封裝在 ChatWebAPIUtils 物件裏
ChatWebAPIUtils.getAllMessages();

// 建立 app 的基底元件，也就是 ChatApp
React.renderComponent(
    <ChatApp />,

    // 在 index.html 裏有個 <section> 元素名稱叫 'react'
    document.getElementById('react')
);
