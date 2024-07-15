import React from 'react';
import Overlay from './Overlay';
import PageLoader from './PageLoader';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import "adminbsb-materialdesign/css/themes/all-themes.css";

class MainComponent extends React.Component {
    state = {
        bodyClass: "theme-red ls-closed",
        displayOverlay: "none",
        width: window.innerWidth,
        loading: true,
    };

    onBarClick = () => {
        this.setState(prevState => {
            const isOverlayOpen = prevState.bodyClass.includes("overlay-open");
            return {
                bodyClass: isOverlayOpen ? "theme-red ls-closed" : "theme-red ls-closed overlay-open",
                displayOverlay: isOverlayOpen ? "none" : "block"
            };
        });
    };

    onScreenResize = () => {
        this.setState({ width: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.onScreenResize);

        const inputall = document.querySelectorAll("input");
        inputall.forEach((input) => {
            input.addEventListener("focus", function () {
                this.parentNode.className = "form-line focused";
            });
        });
        inputall.forEach((input) => {
            input.addEventListener("blur", function () {
                this.parentNode.className = "form-line ";
            });
        });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onScreenResize);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.width !== this.state.width) {
            this.updateBodyClass();
        }
    }

    updateBodyClass = () => {
        if (this.state.width > 1150) {
            document.getElementById("root").className = "theme-red";
        } else {
            document.getElementById("root").className = this.state.bodyClass;
        }
    };

    render() {
        console.log(this.props);
        if(this.state.width > 1150) {
            document.getElementById("root").className = "theme-red";
        }else{
            document.getElementById("root").className = this.state.bodyClass;
        }

        const Page = this.props.page;

        return (
            <React.Fragment>
                <style>
                    {`
                        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
                        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
                    `}
                </style>

                <Overlay display={this.state.displayOverlay} />
                <Navbar onBarClick={this.onBarClick} />
                <Sidebar activepage={this.props.activepage} />
                <Page {...this.props} />
            </React.Fragment>
        );
    }
}

export default MainComponent;
