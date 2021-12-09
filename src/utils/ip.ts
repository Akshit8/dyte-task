import { Request } from "express";
import geoip from "geoip-lite";
import { ipLocation } from "../types";

export class IPUtils {
  static getUserIP = (req: Request): string | null => {
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    if (Array.isArray(ip)) {
      ip = ip[0];
    }
    return ip;
  };

  static getIPLocation = (ip: string): ipLocation => {
    const data = geoip.lookup(ip);
    return { city: data?.city, country: data?.country };
  };
}
