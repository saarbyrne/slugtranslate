import { Component } from 'preact';

interface OverlayProps {
  target: HTMLInputElement | HTMLTextAreaElement;
}

export default class Overlay extends Component<OverlayProps> {
  render() {
    return (
      <div className="overlay">
        <div className="overlay-content">
          <textarea 
            placeholder="Type your text here..."
            defaultValue={this.props.target.value}
          />
          <button onClick={() => {
            if (this.props.target) {
              this.props.target.value = (document.querySelector('.overlay textarea') as HTMLTextAreaElement)?.value || '';
              document.getElementById('translate-overlay')?.remove();
            }
          }}>
            Apply
          </button>
        </div>
      </div>
    );
  }
}
