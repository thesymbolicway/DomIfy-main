import React from 'react';

function DropDown({options, raiseChange, value}) {
    return (
        <select value={value} onChange={e => raiseChange(e.target.value)}>
            {options.map((option, i) => <option key={i} value={option.id}>{option.name}</option>)}
        </select>
    );
}

export default DropDown;