import * as React from "react";
import {createRef} from "react";

export default class FileInput extends React.Component {
    labelRef = createRef();

    onFileChosen = (event) => {
        let target = event.target;
        if (target.files) {
            const label = this.labelRef.current;
            if (label) {
                label.innerText = target.files.item(0).name;
            }
            this.props.handleFileChoose(target.files.item(0));
        }
    };

    render() {
        return (

            <div className="custom-file">
                <input
                    type="file"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.onFileChosen}
                    accept='*'
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01" ref={this.labelRef}>
                    Выбрать файл
                </label>
            </div>

        );
    }
}