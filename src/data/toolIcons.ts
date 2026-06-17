import burpSuiteLogo from "@/assets/tools/burpsuite.svg";
import cssLogo from "@/assets/tools/css3.svg";
import dockerLogo from "@/assets/tools/docker.svg";
import expressLogo from "@/assets/tools/express.svg";
import figjamLogo from "@/assets/tools/figjam.svg";
import figmaLogo from "@/assets/tools/figma.svg";
import firebaseLogo from "@/assets/tools/firebase.svg";
import framerLogo from "@/assets/tools/framer.svg";
import gitLogo from "@/assets/tools/git.svg";
import githubLogo from "@/assets/tools/github.svg";
import googleColabLogo from "@/assets/tools/googlecolab.svg";
import gsapLogo from "@/assets/tools/gsap.svg";
import htmlLogo from "@/assets/tools/html5.svg";
import intelliJLogo from "@/assets/tools/intellijidea.svg";
import javaLogo from "@/assets/tools/java.svg";
import javascriptLogo from "@/assets/tools/javascript.svg";
import jupyterLogo from "@/assets/tools/jupyter.svg";
import laravelLogo from "@/assets/tools/laravel.svg";
import mongodbLogo from "@/assets/tools/mongodb.svg";
import mySqlLogo from "@/assets/tools/mysql.svg";
import nextJsLogo from "@/assets/tools/nextdotjs.svg";
import nodeJsLogo from "@/assets/tools/nodedotjs.svg";
import phpLogo from "@/assets/tools/php.svg";
import phpMyAdminLogo from "@/assets/tools/phpmyadmin.svg";
import postgresqlLogo from "@/assets/tools/postgresql.svg";
import postmanLogo from "@/assets/tools/postman.svg";
import pythonLogo from "@/assets/tools/python.svg";
import reactLogo from "@/assets/tools/react.svg";
import supabaseLogo from "@/assets/tools/supabase.svg";
import tailwindCssLogo from "@/assets/tools/tailwindcss.svg";
import threeJsLogo from "@/assets/tools/threedotjs.svg";
import typescriptLogo from "@/assets/tools/typescript.svg";
import vsCodeLogo from "@/assets/tools/vscode.svg";
import vueJsLogo from "@/assets/tools/vuedotjs.svg";
import wiresharkLogo from "@/assets/tools/wireshark.svg";
import xamppLogo from "@/assets/tools/xampp.svg";

type ToolIcon = {
  src: string;
};

export const TOOL_ICONS: Record<string, ToolIcon> = {
  figma: { src: figmaLogo },
  figjam: { src: figjamLogo },
  framer: { src: framerLogo },
  vscode: { src: vsCodeLogo },
  xampp: { src: xamppLogo },
  git: { src: gitLogo },
  github: { src: githubLogo },
  postman: { src: postmanLogo },
  mysql: { src: mySqlLogo },
  phpmyadmin: { src: phpMyAdminLogo },
  jupyter: { src: jupyterLogo },
  googlecolab: { src: googleColabLogo },
  wireshark: { src: wiresharkLogo },
  burpsuite: { src: burpSuiteLogo },
  html5: { src: htmlLogo },
  css3: { src: cssLogo },
  javascript: { src: javascriptLogo },
  typescript: { src: typescriptLogo },
  react: { src: reactLogo },
  nextdotjs: { src: nextJsLogo },
  tailwindcss: { src: tailwindCssLogo },
  php: { src: phpLogo },
  laravel: { src: laravelLogo },
  java: { src: javaLogo },
  python: { src: pythonLogo },
  intellijidea: { src: intelliJLogo },
  vuedotjs: { src: vueJsLogo },
  gsap: { src: gsapLogo },
  threedotjs: { src: threeJsLogo },
  nodedotjs: { src: nodeJsLogo },
  express: { src: expressLogo },
  mongodb: { src: mongodbLogo },
  postgresql: { src: postgresqlLogo },
  firebase: { src: firebaseLogo },
  supabase: { src: supabaseLogo },
  docker: { src: dockerLogo },
};
