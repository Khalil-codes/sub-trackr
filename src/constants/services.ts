import { Service } from "@/types";
import { Adobe, Netflix } from "./icons";
import {
  SpotifyLogo,
  TwitchLogo,
  YoutubeLogo,
  AmazonLogo,
  AppleLogo,
  TwitterLogo,
  OpenAiLogo,
  DribbbleLogo,
} from "@phosphor-icons/react/dist/ssr";

export const SERVICES: Service[] = [
  {
    name: "Netflix",
    id: "netflix",
    icon: Netflix,
  },
  {
    name: "Spotify",
    id: "spotify",
    icon: SpotifyLogo,
  },
  {
    name: "Youtube",
    id: "youtube",
    icon: YoutubeLogo,
  },
  {
    name: "Twitch",
    id: "twitch",
    icon: TwitchLogo,
  },
  {
    name: "Amazon",
    id: "amazon",
    icon: AmazonLogo,
  },
  {
    name: "Apple",
    id: "apple",
    icon: AppleLogo,
  },
  {
    name: "Twitter",
    id: "twitter",
    icon: TwitterLogo,
  },
  {
    name: "OpenAI",
    id: "openai",
    icon: OpenAiLogo,
  },
  {
    name: "Dribbble",
    id: "dribbble",
    icon: DribbbleLogo,
  },
  {
    name: "Adobe",
    id: "adobe",
    icon: Adobe,
  },
];
