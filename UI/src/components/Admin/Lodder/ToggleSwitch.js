import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label }) => {
return (
	<div className="container tg_cls">
		<h4> <span>{label}{" "}</span>
    <small>
        <span className="btn-group">
		<div className="toggle-switch">
		<input type="checkbox" className="checkbox"
			name={label} id={label} />
		<label className="label" htmlFor={label}>
		<span className="inner" />
		<span className="switch" />
		</label>
	</div>
        </span>
    </small>
</h4>
	</div>
);
};

export default ToggleSwitch;
