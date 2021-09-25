/* eslint-disable no-restricted-syntax */
import React from 'react';

import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js';

export interface IProps {
  multiple?: boolean;
  liveSearch?: boolean;
  withActions?: boolean;
}

const Select: React.FC<IProps> = (props) => (
  <div className="form-group">
    <select className="selectpicker w-100" data-live-search={props.liveSearch} multiple={props.multiple} data-actions-box={props.withActions}>
      {props.children}
    </select>
  </div>
);

export default Select;
