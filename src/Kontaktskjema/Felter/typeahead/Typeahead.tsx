import * as React from "react";
import TypeaheadSuggestion from './TypeaheadSuggestion';
import "./typeahead.less";
import { Input } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

export interface Suggestion {
    key: string;
    value: string;
}

interface Props {
    onSelect: (value: Suggestion) => void;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder: string;
    suggestions: Suggestion[];
    value: string;
    label: string;
    ariaLabel: string;
    id: string;
    feil?: string;
    'data-testid'?: string;
}

interface State {
    activeSuggestionIndex: number;
    hasFocus: boolean;
    shouldShowSuggestions: boolean;
    setAriaActiveDescendant: boolean;
    shouldBlur: boolean;
    blurDelay: any;
}

class Typeahead extends React.Component<Props, State> {
    inputElement: HTMLInputElement | null;

    constructor(props: Props) {
        super(props);
        this.state = {
            activeSuggestionIndex: -1,
            hasFocus: false,
            shouldShowSuggestions: true,
            setAriaActiveDescendant: false,
            shouldBlur: true,
            blurDelay: null
        };

        this.inputElement = null;
    }

    componentWillUnmount() {
        if (this.state.blurDelay) {
            clearTimeout(this.state.blurDelay);
            this.setState({blurDelay: null});
        }
    }

    /**
     * Vil skje hver gang man legger til eller fjerner en bokstav fra inputfeltet
     */
    onChange(event: any) {
        const { value } = event.target;

        this.setState({
            activeSuggestionIndex: -1, // Nullstill eventuelt markering av et forslag i listen
            shouldShowSuggestions: true // Vis forslagslisten igjen. Den kan ha blitt skjult om man trykket Esc
        });
        this.props.onChange(value);

        const elem = this.props.suggestions.find(
            suggestion => value.toLowerCase() === suggestion.value.toLowerCase()
        );
        if (elem) {
            this.props.onSelect(elem);
        }
    }

    /**
     * Behandler tastaturnavigasjon i forslagslisten.
     * @param event
     */
    onKeyDown(event: any) {
        let { activeSuggestionIndex } = this.state;
        const hasSelectedSuggestion = activeSuggestionIndex > -1;

        /**
         * It’s important to only set aria-activedescendant after the Down arrow key is used to start traversing the
         * associated Listbox options, and to clear aria-activedescendant by removing the attribute or setting it to “”
         * every time the Left/Right arrow keys are pressed, as with Home/End, Escape, or when typing characters or
         * pasting content into the edit field. Otherwise the accessibility tree will report that focus is within the
         * Listbox and it will be impossible for screen reader users to review the text that has been typed into the
         * edit field.
         * https://www.levelaccess.com/differences-aria-1-0-1-1-changes-rolecombobox/
         */
        this.setState({
            setAriaActiveDescendant: event.keyCode === 38 || event.keyCode === 40
        });

        switch (event.keyCode) {
            case 9: // Tab
                if (hasSelectedSuggestion && this.state.shouldShowSuggestions) {
                    this.setValue(this.props.suggestions[activeSuggestionIndex]);
                }
                break;
            case 13: // Enter
                if (hasSelectedSuggestion && this.state.shouldShowSuggestions) {
                    event.preventDefault(); // Unngå form submit når bruker velger et av forslagene
                    this.setValue(this.props.suggestions[activeSuggestionIndex]);
                } else {
                    this.setState({
                        shouldShowSuggestions: false
                    });
                }
                break;
            case 27: // Esc
                // Hvis man trykker Esc, og forslagslisten er synlig, så skal listen skjules.
                // Hvis forslagslisten allerede er skjult, så vil verdien i
                // inputfeltet slettes (hvis dette er standard oppførsel i browseren).
                if (this.state.shouldShowSuggestions && this.props.suggestions.length > 0) {
                    event.preventDefault(); // Unngå at verdi i inputfelt slettes
                    this.setState({
                        shouldShowSuggestions: false
                    });
                }
                break;
            case 38: // Pil opp
                if (this.state.shouldShowSuggestions) {
                    event.preventDefault();

                    // Marker forrige suggestion i listen.
                    // Hvis man er på toppen av listen og trykker pil opp, så skal ingen forslag markeres.
                    activeSuggestionIndex = activeSuggestionIndex - 1 === -2 ? -1 : activeSuggestionIndex - 1;
                    this.setState({ activeSuggestionIndex });
                }
                break;
            case 40: // Pil ned
                if (this.state.shouldShowSuggestions) {
                    event.preventDefault();

                    // Marker neste suggestion i listen, så fremst man ikke er på slutten av listen
                    activeSuggestionIndex = activeSuggestionIndex + 1 === this.props.suggestions.length
                        ? this.props.suggestions.length - 1
                        : activeSuggestionIndex + 1;
                    this.setState({ activeSuggestionIndex });
                }
                break;
            default:
                break;
        }
    }

    onFocus() {
        this.setState({
            hasFocus: true,
            activeSuggestionIndex: -1
        });
    }

    /**
     * Når man trykker med musen på et forslag i listen, så vil dette museklikket
     * forårsake at det også trigges onBlur på input'en. Normalt vil onBlur skjule
     * suggestions-listen. Men når man trykker med musen på et forslag, trenger vi
     * at forslagene ikke skjules, slik at setValue rekker å bli kjørt.
     */
    onBlur() {
        const blurDelay = setTimeout(() => {
            if (this.state.shouldBlur) {
                this.setState({
                    hasFocus: false
                });
                if (this.props.onBlur) {
                    this.props.onBlur();
                }
            }
        }, 10);
        this.setState({blurDelay});
    }

    /**
     * Markerer et forslag i listen når bruker trykker pil opp/ned på tastaturet,
     * eller når man man fører musen over et forslag.
     * @param index
     */
    setSuggestionIndex(index: number) {
        this.setState({
            activeSuggestionIndex: index
        });
        this.clearBlurDelay();
    }

    /**
     * Setter valgt forslag, og skjuler forslagslisten.
     * @param value
     */
    setValue(value: Suggestion) {
        this.setState({
            shouldShowSuggestions: false,
            activeSuggestionIndex: -1
        }, () => {
            const element = this.inputElement;
            if (element) {
                element.focus();
            }
        });
        this.clearBlurDelay();
        this.props.onSelect(value);
    }

    avoidBlur() {
        this.setState({shouldBlur: false});
    }

    clearBlurDelay() {
        if (this.state.blurDelay) {
            clearTimeout(this.state.blurDelay);
            this.setState({blurDelay: null});
        }
        this.setState({shouldBlur: true});
    }

    render() {
        const { activeSuggestionIndex, setAriaActiveDescendant } = this.state;

        const showSuggestions = this.state.hasFocus
            && this.state.shouldShowSuggestions
            && this.props.suggestions.length > 0;

        const activeDescendant = setAriaActiveDescendant && activeSuggestionIndex > -1
            ? `${this.props.id}-item-${activeSuggestionIndex}` : undefined;

        const feil = showSuggestions ? undefined : this.props.feil;

        return (
            <div
                className="navAutcomplete Typeahead"
                role="combobox"
                aria-expanded={showSuggestions}
                aria-owns={`${this.props.id}-suggestions`}
                aria-haspopup="listbox"
                aria-controls=""
            >
                <Input
                    label={<Element>{this.props.label}</Element>}
                    id={this.props.id}
                    type="search"
                    aria-label={this.props.ariaLabel}
                    aria-autocomplete="list"
                    aria-controls={`${this.props.id}-suggestions`}
                    aria-activedescendant={activeDescendant}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    autoComplete="off"
                    onChange={(event: any) => this.onChange(event)}
                    onBlur={() => this.onBlur()}
                    onKeyDown={(event: any) => this.onKeyDown(event)}
                    onFocus={() => this.onFocus()}
                    inputRef={element => this.inputElement = element}
                    className="felt typo-normal"
                    feil={feil}
                    data-testid={this.props['data-testid']}
                />
                <ul
                    id={`${this.props.id}-suggestions`}
                    role="listbox"
                    className={showSuggestions ? 'Typeahead__suggestions' : 'Typeahead__suggestions--hidden'}
                >
                    {showSuggestions && this.props.suggestions.map((suggestion: Suggestion, index: number) => (
                        <TypeaheadSuggestion
                            id={`${this.props.id}-item-${index}`}
                            key={suggestion.key}
                            index={index}
                            value={suggestion}
                            match={this.props.value}
                            active={index === this.state.activeSuggestionIndex}
                            onClick={(value: Suggestion) => this.setValue(value)}
                            setSuggestionIndex={(idx: number) => this.setSuggestionIndex(idx)}
                            avoidBlur={() => this.avoidBlur()}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default Typeahead;