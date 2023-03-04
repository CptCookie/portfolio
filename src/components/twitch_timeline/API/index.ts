import { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import {
  Channel,
  PagResponse,
  Schedule,
  TokenValidation,
  UserFollow,
} from "./twitch.interface";
import internal from "stream";

const client_id = "wdcgouh30a0u2shuppiwpfp40uwyv3";
export const validate_user = (token: string) => {
  const url = "https://id.twitch.tv/oauth2/validate";
  let header = new Headers();
  header.set("Authorization", `Bearer ${token}`);

  return axios.get<TokenValidation>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

class API {
  token: string;
  axios: AxiosInstance;

  constructor(token: string) {
    this.token = token;
    this.axios = axios.create({
      headers: {
        "Client-Id": client_id,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private get_paged_data = <T>(
    url: string,
    pag_cursor = ""
  ): Promise<AxiosResponse<PagResponse<T[]>>> => {
    let _url = url;
    if (pag_cursor) {
      _url = _url + `&after=${pag_cursor}`;
    }

    return this.axios.get<PagResponse<T[]>>(_url).then((resp) => {
      if (resp.data.pagination.cursor) {
        // we only got a part of the data, fetch the rest recursivly
        return this.get_paged_data<T>(_url, resp.data.pagination.cursor).then(
          (inner_resp) => {
            return {
              ...inner_resp,
              data: {
                ...inner_resp.data,
                data: [...resp.data.data, ...inner_resp.data.data],
              },
            };
          }
        );
      } else {
        return resp;
      }
    });
  };

  read_following = (from_id: string) => {
    return this.get_paged_data<UserFollow>(
      `https://api.twitch.tv/helix/users/follows?from_id=${from_id}&first=100`
    );
  };

  read_schedule = (
    from_id: string,
    start_time: string = "2023-01-01T00:00:00Z"
  ) => {
    return this.axios.get<PagResponse<Schedule>>(
      `https://api.twitch.tv/helix/schedule?broadcaster_id=${from_id}&start_time=${start_time}&first=25`
    );
  };

  read_channels = (from_ids: string[]) => {
    const search_string = from_ids.join("&id=");
    interface ChannelResponse {
      data: Channel[];
    }
    return this.axios.get<ChannelResponse>(
      `https://api.twitch.tv/helix/users?id=${search_string}`
    );
  };
}

export default API;
