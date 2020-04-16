import App from 'next/app';

class CustomApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        return (
            <div>
                <Component {...pageProps} />
            </div>
        );
    }

    componentDidMount() {
        $(function () {
            $(document).on("click", ".countryBadge", function (e) {
                var item = $($(".country .countryNameLabel:contains(" + e.target.innerText.replace("#", "") + ")")[0].parentElement);
                item.removeClass("bg-info");
                item.removeClass("text-white");
                item.addClass("text-danger");
                $(".badge:contains(" + e.target.innerText + ")").remove();
            });

            if ($(".countries") != null) {
                // $(".countries").css("padding-top", $(".navbar").height() + "px");
                $("#countryNameId").focus();
            }

            if ($(".chartGroupButton") != null && $(".chartGroupButton button")[0] != null) {
                $(".chartGroupButton button")[0].click();
            }

            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'UA-12370199-5');
        });
    }
}

export default CustomApp;
