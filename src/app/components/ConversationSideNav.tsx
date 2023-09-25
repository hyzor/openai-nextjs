"use client";

import React from "react";
import { useEffect } from "react";

type ConversationSideNavProps = {
  conversations: [];
};

const ConversationSideNav = ({ conversations }: ConversationSideNavProps) => {
  console.log(conversations);

  useEffect(() => {
    const init = async () => {
      const { Sidenav, initTE } = await import("tw-elements");
      initTE({ Sidenav });
    };
    init();
  }, []);

  return (
    <nav
      id="sidenav-3"
      className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-zinc-800 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0"
      data-te-sidenav-init
      data-te-sidenav-hidden="false"
      data-te-sidenav-color="white"
    >
      <ul
        className="relative m-0 list-none px-[0.2rem]"
        data-te-sidenav-menu-ref
      >
        <li className="relative">
          <a
            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none transition duration-300 ease-linear hover:bg-white/10 hover:outline-none focus:bg-white/10 focus:outline-none active:bg-white/10 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
            data-te-sidenav-link-ref
          >
            <span>Conversation 1</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ConversationSideNav;
