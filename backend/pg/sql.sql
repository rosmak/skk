CREATE TABLE public.companies (
	"companyId" uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"description" varchar NULL,
	"pax" int NULL,
	CONSTRAINT companies_pk PRIMARY KEY ("companyId")
);

CREATE TABLE public.users (
	"userId" uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NULL,
	CONSTRAINT users_pk PRIMARY KEY ("userId")
);

CREATE TABLE public.transfers (
	"transferId" uuid NOT NULL DEFAULT gen_random_uuid(),
	"from" varchar NOT NULL,
	"to" varchar NOT NULL,
	"departure" timestamp NOT NULL,
	"arrival" timestamp NOT NULL,
	"companyId" uuid NOT NULL,
	CONSTRAINT departures_pk PRIMARY KEY ("transferId"),
	CONSTRAINT transfers_fk FOREIGN KEY ("companyId") REFERENCES public.companies("companyId")
);

CREATE TABLE public.tickets (
	"ticketId" uuid NOT NULL DEFAULT gen_random_uuid(),
	"transferId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT ticket_pk PRIMARY KEY ("ticketId"),
	CONSTRAINT ticket_fk FOREIGN KEY ("transferId") REFERENCES public.transfers("transferId"),
	CONSTRAINT ticket_fk_1 FOREIGN KEY ("userId") REFERENCES public.users("userId")
);
