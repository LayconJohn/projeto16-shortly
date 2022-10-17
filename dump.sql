--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    email character varying(30) NOT NULL,
    password text,
    "createAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, 1, 'f1d2329a-8d45-4cee-a032-6b57470e29a3', '2022-10-12 21:33:05.277813');
INSERT INTO public.sessions VALUES (3, 1, 'cff9d927-c22c-4576-bd25-8d0cfc59a1fe', '2022-10-13 18:17:09.472943');
INSERT INTO public.sessions VALUES (4, 1, '9947b3ab-67a6-4da7-af45-eda43829065e', '2022-10-13 18:17:30.056012');
INSERT INTO public.sessions VALUES (5, 2, '7ebafce1-e8c2-4c61-9e84-8c386a3eacfc', '2022-10-15 18:26:47.838027');
INSERT INTO public.sessions VALUES (6, 2, '5a978781-7fdd-4e1d-a603-49b27b2ae232', '2022-10-16 11:54:19.588544');
INSERT INTO public.sessions VALUES (7, 3, '7ee53a62-cef7-4424-b945-1e2ee47f61df', '2022-10-16 12:02:14.563343');
INSERT INTO public.sessions VALUES (8, 4, '549726f8-1b22-489c-8112-fb4aa1d891a3', '2022-10-16 12:08:23.282922');
INSERT INTO public.sessions VALUES (9, 5, '910e708c-da45-47af-bc4c-629bd24c5097', '2022-10-16 12:11:45.270413');
INSERT INTO public.sessions VALUES (10, 6, '2f7bee52-33d0-47ba-9698-5bd70b8f5f9a', '2022-10-16 12:14:05.369636');
INSERT INTO public.sessions VALUES (11, 6, '76728288-62f4-48a0-b649-3d7a5e4b867f', '2022-10-16 12:14:14.127783');
INSERT INTO public.sessions VALUES (12, 8, '95d874ce-7b0d-4411-af7f-e8a61acd1ca2', '2022-10-16 12:18:36.5488');
INSERT INTO public.sessions VALUES (13, 9, 'ffa435a4-a120-41e3-a76b-eab57286d16b', '2022-10-16 12:21:12.596907');
INSERT INTO public.sessions VALUES (14, 10, 'a4d9fb2e-e432-4146-bf71-1d94b7700515', '2022-10-16 12:24:21.423133');
INSERT INTO public.sessions VALUES (15, 12, '946517b8-93e8-475f-bab5-2a4e500bb0de', '2022-10-16 12:28:04.44653');
INSERT INTO public.sessions VALUES (16, 14, 'd76493be-a177-47a8-b175-e120379a7db3', '2022-10-17 15:23:38.404177');
INSERT INTO public.sessions VALUES (17, 14, '8fae933c-94d1-4943-8a28-eb9d2d5a2591', '2022-10-17 15:29:13.97699');
INSERT INTO public.sessions VALUES (18, 14, '8888fdf5-2dba-416f-885b-f90a6716a5cb', '2022-10-17 15:29:24.079121');
INSERT INTO public.sessions VALUES (19, 14, 'd9bfdf6c-adb1-483c-a3d6-663c25c85ce4', '2022-10-17 15:29:37.890328');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (4, 'https://www.youtube.com/watch?v=hWMw42QIZss&list=RD5iZhE5k7lQ4&index=2', 'YpCf8DQcJl', 0, 2, '2022-10-16 11:55:17.891433');
INSERT INTO public.urls VALUES (5, 'https://bootcampra.notion.site/Quarta-05-10-Corre-o-Pr-tica-JOIN-Group-By-e-Agregadores-Pr-tica-Group-By-5f7ac6dd7bfe4a8899110d13b1b84e64', 'Ivlt6rhlUZ', 0, 2, '2022-10-16 11:55:33.815091');
INSERT INTO public.urls VALUES (6, 'https://trello.com/b/Jx8Bhxbv/projeto16-shortly', 'BwYKcpSCMj', 0, 2, '2022-10-16 11:56:00.443214');
INSERT INTO public.urls VALUES (7, 'https://www.youtube.com/watch?v=Unt3qRV2tK0&list=RD5iZhE5k7lQ4&index=3', 'K4Z4QBS1T8', 0, 3, '2022-10-16 12:03:09.457641');
INSERT INTO public.urls VALUES (8, 'https://g1.globo.com/saude/coronavirus/vacinas/noticia/2022/10/16/a-cada-2-dias-1-crianca-com-menos-de-5-anos-morre-de-covid-no-brasil-grupo-esta-sem-vacina-e-governo-nao-diz-quando-tera-doses-da-pfizer.ghtml', 'em9yWKCuiC', 0, 3, '2022-10-16 12:04:08.770141');
INSERT INTO public.urls VALUES (9, 'https://g1.globo.com/mundo/noticia/2022/10/16/xi-jinping-diz-que-a-china-ja-conquistou-controle-total-de-hong-kong-e-que-esta-determinada-a-fazer-isso-em-taiwan.ghtml', 'P2srRa_MAE', 0, 3, '2022-10-16 12:04:46.278751');
INSERT INTO public.urls VALUES (10, 'https://oglobo.globo.com/brasil/noticia/2022/10/nova-leva-de-migrantes-venezuelanos-chega-ao-brasil-ainda-mais-miseravel.ghtml?utm_source=globo.com&utm_medium=oglobo', 'P6gbw7t6Ln', 0, 3, '2022-10-16 12:05:04.548982');
INSERT INTO public.urls VALUES (11, 'https://www.magazineluiza.com.br/fone-de-ouvido-sem-fio-waaw-by-alok-mob-200eb-bluetooth-tws-microfone-integrado-modo-gamer-resistente-a-agua-preto-e-ver-wap/p/kkhja4jekh/ea/fobt/?&seller_id=2eletroinfo', 'kAeP8MpVgp', 0, 3, '2022-10-16 12:07:16.902928');
INSERT INTO public.urls VALUES (12, 'https://www.magazineluiza.com.br/fone-de-ouvido-headset-gamer-eg305rd-thoth-vermelho-com-fio-evolut/p/hhfc99k3e3/ea/hdga/', 'gRz2OIRGXR', 0, 4, '2022-10-16 12:09:10.784276');
INSERT INTO public.urls VALUES (13, 'https://www.magazineluiza.com.br/enchimento-especial-10kl-puff-gigante-almofadao-1-40x20-rede-sul-fabrica-de-moveis/p/ababf465fe/mo/pffg/', 'EgeRwBlLBk', 0, 4, '2022-10-16 12:09:28.501261');
INSERT INTO public.urls VALUES (14, 'https://www.magazineluiza.com.br/smart-tv-43-full-hd-led-tcl-android-tv-43s615-va-wi-fi-bluetooth-hdr-google-assistente-built-in/p/233914900/et/elit/', 'wgzjISFE9u', 0, 4, '2022-10-16 12:09:47.358038');
INSERT INTO public.urls VALUES (15, 'https://www.magazineluiza.com.br/tenis-branco-feminino-vili-esportivo/p/je51ga5600/md/tens/', '5QInwSOnp7', 0, 5, '2022-10-16 12:12:53.667933');
INSERT INTO public.urls VALUES (16, 'https://www.magazineluiza.com.br/tenis-para-academia-feminino-esportivo-lancamento-bf-shoes/p/faghkc16h1/md/tens/', '8MHBmpVYGo', 0, 5, '2022-10-16 12:13:06.819781');
INSERT INTO public.urls VALUES (17, 'https://www.magazineluiza.com.br/kit-guitarra-tagima-tg500-strato-branca-com-caixa-amplificada/p/djfbk31a86/im/iigu/', 'kNEmLKTFVQ', 0, 6, '2022-10-16 12:15:09.187622');
INSERT INTO public.urls VALUES (18, 'https://www.magazineluiza.com.br/lampada-musical-caixa-som-bluetooth-led-rgb-com-controle-e27/p/fddgg81g51/cj/lald/', 'DoIuI6PJY9', 0, 6, '2022-10-16 12:15:52.335934');
INSERT INTO public.urls VALUES (19, 'https://www.youtube.com/watch?v=bangJ3Vx7PI&list=RD5iZhE5k7lQ4&index=6', 'DfDpd-C_Mr', 0, 8, '2022-10-16 12:19:09.951901');
INSERT INTO public.urls VALUES (20, 'https://finance.yahoo.com/news/social-security-62-wait-3-180000713.html', 'c0oY_NZ2lP', 0, 8, '2022-10-16 12:19:40.063897');
INSERT INTO public.urls VALUES (22, 'https://www.youtube.com/watch?v=0hV9qYJ3IHQ&list=RD5iZhE5k7lQ4&index=7', 'WXDAKJlg_U', 0, 9, '2022-10-16 12:21:50.085519');
INSERT INTO public.urls VALUES (24, 'https://www.youtube.com/watch?v=BUL7zecHZjA&list=RD5iZhE5k7lQ4&index=8', 's8XS1PqTGe', 0, 10, '2022-10-16 12:25:28.009132');
INSERT INTO public.urls VALUES (26, 'https://games.bet365.com/Play/1524GoldenQuest?tid=s_1_cate_5_newgam&returnPath=https%3A%2F%2Fgames.bet365.com%2Fhome', '7fivs96Dfp', 0, 12, '2022-10-16 12:29:16.263295');
INSERT INTO public.urls VALUES (27, 'https://games.bet365.com/Play/DemonHeartTheHunt?tid=s_1_cate_1_origin&returnPath=https%3A%2F%2Fgames.bet365.com%2Fhome', 'VZp7XCy25D', 0, 12, '2022-10-16 12:29:32.33295');
INSERT INTO public.urls VALUES (21, 'https://finance.yahoo.com/m/5d12dc82-44bf-3dcc-9261-0f9d0bb4dc4b/%E2%80%98we%E2%80%99re-seeing-buyers-backing.html', '182-qqhVoe', 1, 8, '2022-10-16 12:19:53.292957');
INSERT INTO public.urls VALUES (25, 'https://ge.globo.com/futebol/futebol-internacional/futebol-espanhol/jogo/16-10-2022/realmadrid-barcelona.ghtml', 'mmDUTaPgAE', 1, 10, '2022-10-16 12:26:01.547332');
INSERT INTO public.urls VALUES (23, 'https://www.instagram.com/p/CiESIfAgO09/', 'GHMtK5hDf1', 2, 9, '2022-10-16 12:23:08.187315');
INSERT INTO public.urls VALUES (28, 'https://www.google.com/search?q=tradutor&oq=tradutor&aqs=chrome.0.69i59j35i39j0i131i433i512l5j0i512j0i131i433i512l2.1211j0j4&sourceid=chrome&ie=UTF-8', 'cl2FozKK7d', 0, 12, '2022-10-17 15:50:02.319753');
INSERT INTO public.urls VALUES (3, 'https://bootcampra.notion.site/Projeto-Shortly-API-21533489cd5042058524caf3429b62e4', '14XfFHAFAj', 7, 1, '2022-10-14 16:47:15.117885');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$12$fQRBAL.myzl8jT9eCd51e.SrSV8rxa2u9/7qQV8dQPeKsmMsBzDDK', '2022-10-12 21:10:21.891378');
INSERT INTO public.users VALUES (2, 'Juan Pablo', 'juan@email.com', '$2b$12$CwRfANJvw6GvK9lcecezvulLktwh16nK8BBEwYyGWAvHRgDzCir0u', '2022-10-15 18:26:25.100224');
INSERT INTO public.users VALUES (3, 'Maria', 'maria@email.com', '$2b$12$FVHwbgE/tYB6Y7OsNzGpeOcqIwtw6a0d/YP2Xg1BL3f22RchMicei', '2022-10-16 12:01:58.613687');
INSERT INTO public.users VALUES (4, 'Qualy', 'qualy@email.com.br', '$2b$12$57dHq.hEzGIO.BtxikXfvOpM0fB9gdU80WQRlTQIbu2dV/yv62lq2', '2022-10-16 12:08:09.719218');
INSERT INTO public.users VALUES (5, 'Iris', 'iris@email.com', '$2b$12$i//SsT9oZ6t6rPm61nT4Je1u/AS4j9zXMGyfVzYvfbfPgcMBNomCq', '2022-10-16 12:11:34.324217');
INSERT INTO public.users VALUES (6, 'Matuê', 'matuzalem@email.com.br', '$2b$12$v8GTmLRS/UQatHfoiU0jmeFuF9.iIhfJ18ZYH4dblSUs0gckoWREu', '2022-10-16 12:13:53.151992');
INSERT INTO public.users VALUES (7, 'Rafaela', 'rafa-ela@email.com.br', '$2b$12$y/10KpN/pk1Pd6M/3.fszObZzFg.temdchY7dFpqQ79FoWk0vs1xG', '2022-10-16 12:17:59.281287');
INSERT INTO public.users VALUES (8, 'Irineu', 'irineu@email.com.br', '$2b$12$.lo0xGCNRnz8hO24/SNUmeNe294gxnmukiY1aVHVw76IjOh3ohI6e', '2022-10-16 12:18:24.540012');
INSERT INTO public.users VALUES (9, 'Mano brown', 'brown@mc.com.br', '$2b$12$wciCDE4hIHD70zWLFpBE3.2zNdvqK7gScRBdiip6TJOpU4x20CBcm', '2022-10-16 12:20:57.384136');
INSERT INTO public.users VALUES (10, 'Josinaldo', 'josii@email.com.br', '$2b$12$.b83cCsPiECLaRP2NMK7Ze0y6RM.bOELJYuDFFNJL6Z9G.BgOgAia', '2022-10-16 12:24:08.265703');
INSERT INTO public.users VALUES (11, 'Liliane', 'lili@email.com.br', '$2b$12$GhHDRT9rrsxvTnQCAehg7uQcmd.uUfLgFnuHjpL6SVqKPp/O3NL.G', '2022-10-16 12:27:22.922937');
INSERT INTO public.users VALUES (12, 'luzy', 'luluzinha@email.com.br', '$2b$12$njUUWGgQPqVx.grL4sXZPe3AjMfHh2oNI2YIBNcEqgbLXXjFD.hty', '2022-10-16 12:27:53.777368');
INSERT INTO public.users VALUES (13, 'Marcus', 'marc@email.com.br', '$2b$12$iCrTFd.X6BmD/R7rUlVW9uGL8vV68i/zX.ejypB5MsnkGTUboXZqi', '2022-10-16 12:30:50.565404');
INSERT INTO public.users VALUES (14, 'Juanzito', 'juan@uol.com.br', '$2b$10$EoJ3SIPfCQcY4a72oJ3rdOQjsAbCyWml9wtb5bMSbb6RbJQqT0M7q', '2022-10-17 15:18:57.123803');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 19, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

