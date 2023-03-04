import React, { useMemo } from "react";
import API, { validate_user } from "./API";

interface TwitchToken {
  access_token: string;
  scope: string;
  state: string;
  token_type: string;
}

interface Props {
  token: TwitchToken;
}

const ReadSubs: React.FC<Props> = ({ token }) => {
  const twitch_api = useMemo(() => {
    return new API(token.access_token);
  }, [token]);

  const read_subs = () => {
    twitch_api
      .read_following("88027169")
      .then((data) => console.debug(data.data));
  };

  return (
    <div>
      <button onClick={() => validate_user(token.access_token)}>
        {" "}
        validate User{" "}
      </button>
      <button onClick={read_subs}> Fetch Follows </button>
      <button
        onClick={() =>
          twitch_api.read_schedule("96555323").then((a) => console.debug(a.data))
        }
      >
        {" "}
        Fetch Schedule{" "}
      </button>
      <button
        onClick={() =>
          twitch_api
            .read_channels(["96555323"])
            .then((a) => console.debug(a.data))
        }
      >
        {" "}
        Fetch Channel (?){" "}
      </button>
    </div>
  );
};

export default ReadSubs;
