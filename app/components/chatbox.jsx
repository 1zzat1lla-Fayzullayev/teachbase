import Script from "next/script";

const MessengerWidget = () => {
  return (
    <Script
      id="messenger-widget-b"
      src="https://cdn.botpenguin.com/website-bot.js"
      strategy="lazyOnload"
      onLoad={() => {
        if (window.BotPenguin) {
          window.BotPenguin.init("67cd357c0ee8663aeac36eb0", "67cd355cc999013c53c9221e");
        }
      }}
    />
  );
};

export default MessengerWidget;
