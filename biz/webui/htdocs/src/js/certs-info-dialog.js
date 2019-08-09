require('./base-css.js');
require('../css/composer.css');
var React = require('react');
var Dialog = require('./dialog');

var HistoryData = React.createClass({
  show: function() {
    this.refs.historyDialog.show();
    this._hideDialog = false;
    this.setState({});
  },
  hide: function() {
    this.refs.historyDialog.hide();
    this._hideDialog = true;
  },
  shouldComponentUpdate: function() {
    return this._hideDialog === false;
  },
  getItem: function(e) {
    var i = e.target.getAttribute('data-index');
    return this.props.data[i];
  },
  onCompose: function(e) {
    this.props.onCompose(this.getItem(e));
  },
  onReplay: function(e) {
    this.props.onReplay(this.getItem(e));
  },
  render: function() {
    var self = this;
    var data = self.props.data || [];
    return (
      <Dialog ref="historyDialog" wstyle="w-composer-history-dialog">
          <div className="modal-body w-composer-history">
            <button type="button" className="close" onClick={self.hide}>
              <span aria-hidden="true">&times;</span>
            </button>
             <table className="table">
              <thead>
                <th className="w-composer-history-order">#</th>
                <th className="w-composer-history-operation">Filename</th>
                <th className="w-composer-history-date">Domain</th>
                <th className="w-composer-history-method">Start Date</th>
                <th className="w-composer-history-url">End Date</th>
                <th className="w-composer-history-operation">Status</th>
              </thead>
              <tbody>
                {
                  data.map(function(item, i) {
                    var date = item.dateStr = item.dateStr || new Date(item.date).toLocaleString();
                    return (
                      <tr>
                        <th className="w-composer-history-order">{i + 1}</th>
                        <td className="w-composer-history-date" title={date}>{date}</td>
                        <td className="w-composer-history-method" title={item.method}>{item.method}</td>
                        <td className="w-composer-history-url" title={item.url}>{item.url}</td>
                        <td className="w-composer-history-operation">
                          <button title="Replay" data-index={i} onClick={self.onReplay} className="btn btn-primary">
                            <span data-index={i} className="glyphicon glyphicon-repeat"></span>
                          </button>
                          <button title="Compose" data-index={i} onClick={self.onCompose} className="btn btn-default">
                            <span data-index={i} className="glyphicon glyphicon-edit"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
             </table>
          </div>
        </Dialog>
    );
  }
});

module.exports = HistoryData;