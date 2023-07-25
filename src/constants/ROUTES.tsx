import { Login, Main, Registration } from "@/pages";
import AnyProfile from "@/pages/AnyProfile/AnyProfile";
import Discussion from "@/pages/Discussion/Discussion";
import ProblemDiscussion from "@/pages/ProblemDiscussion/ProblemDiscussion";
import ProblemDiscussionItem from "@/pages/ProblemDiscussionItem/ProblemDiscussionItem";
import ProblemItem from "@/pages/ProblemItem/ProblemItem";
import Problems from "@/pages/Problems/Problems";
import Profile from "@/pages/Profile/Profile";
import { Role } from "@/ts/types";
import Admin from "@/pages/Admin/Admin";

type IRoute = {
  name: string;
  path: string;
  component: React.ReactElement;
  roles: Role[];
};

export const ROUTES: IRoute[] = [
  {
    name: "Main",
    path: "/",
    component: <Main />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Login",
    path: "/login",
    component: <Login />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Registration",
    path: "/registration",
    component: <Registration />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Profile",
    path: "/profile",
    component: <Profile />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "ProblemsItem",
    path: "/problems/:_id",
    component: <ProblemItem />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Problems",
    path: "/problems",
    component: <Problems />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Discussion",
    path: "/discussion",
    component: <Discussion />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Discussion",
    path: "/problems/:_id/discussion",
    component: <ProblemDiscussion />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "DiscussionPost",
    path: "/problems/:_id/discussion/:post_id",
    component: <ProblemDiscussionItem />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "AnyProfile",
    path: "/profile/:email",
    component: <AnyProfile />,
    roles: [Role.CLIENT, Role.ADMIN],
  },
  {
    name: "Admin",
    path: "/admin",
    component: <Admin />,
    roles: [Role.CLIENT],
  }
];
