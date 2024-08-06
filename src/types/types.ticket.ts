import { TUser } from "./types.user";

export type TTicket = {
  id: number;
  subject: string;
  priority: "low" | "medium" | "high";
  message: string;
  status: number;
  ticketId: string;
  userId: number;
  user: Partial<TUser>;
  created_at: string;
};

export type TMessage = {
  ticket: TTicket;
  TicketMessage: TReply[];
};

type TReply = {
  userId: number;
  ticketId: number;
  message: string;
  created_at: string;
};
