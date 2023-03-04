import React from "react";

function TwitchConnectButton() {
  const url =
    "https://id.twitch.tv/oauth2/authorize" +
    "?response_type=token" +
    "&client_id=wdcgouh30a0u2shuppiwpfp40uwyv3" +
    "&redirect_uri=http://localhost:3000/" +
    "&scope=user%3Aread%3Asubscriptions+user%3Aread%3Afollows" +
    "&state=c3ab8aa609ea11e793ae92361f002671";
  return <a href={url}>Connect with Twitch</a>;
}

export default TwitchConnectButton;
