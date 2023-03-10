import crypto from "crypto";
import { argv } from "process";

let numberOfBytes: number = +argv[2];

console.log(crypto.randomBytes(numberOfBytes).toString("hex"));
