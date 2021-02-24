import * as React from 'react';
import './typeaheadSuggestion.less';
import { Suggestion } from './Typeahead';

interface Props {
    id: string;
    index: number;
    onClick: (value: Suggestion) => void;
    value: Suggestion;
    match: string;
    active: boolean;
    setSuggestionIndex: (index: number) => void;
    avoidBlur: () => void;
}

interface State {
    value: Suggestion;
}

class TypeaheadSuggestion extends React.Component<Props, State> {
    ref: HTMLLIElement | null;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.ref = null;
    }

    onClick() {
        this.props.onClick(this.state.value);
    }

    onMouseMove() {
        this.props.setSuggestionIndex(this.props.index);
    }

    render() {
        const {value} = this.state.value;
        const matchFound = value.toLowerCase().startsWith(this.props.match.toLowerCase());

        if (this.props.active) {
            const ref = this.ref;
            if (ref) {
                ref.scrollIntoView({
                    block: "nearest"
                })
            }
        }

        return (
            <li
                id={this.props.id}
                role="option"
                aria-selected={this.props.active}
                onClick={() => this.onClick()}
                onMouseMove={() => this.onMouseMove()}
                onFocus={() => this.props.avoidBlur()}
                onMouseDown={() => this.props.avoidBlur()}
                onKeyDown={() => this.props.avoidBlur()}
                className="TypeaheadSuggestion typo-normal"
                ref={ref => this.ref = ref}
            >
                {matchFound ? (
                    <span
                        className={`TypeaheadSuggestion__inner ${this.props.active && 'TypeaheadSuggestion--active'}`}
                    >
                        {value.substring(0, this.props.match.length)}
                        <span
                            className="TypeaheadSuggestion__substring"
                        >
                            {value.substring(this.props.match.length)}
                        </span>
                    </span>
                ) : (
                    <span
                        className={`TypeaheadSuggestion__inner ${this.props.active && 'TypeaheadSuggestion--active'}`}
                    >
                        {value}
                    </span>
                )}
            </li>
        );
    }

}

export default TypeaheadSuggestion;