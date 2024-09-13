"use client";

import siteMeta from "@/config/site.config"
import { AuthKitProvider, SignInButton } from "@farcaster/auth-kit"
import "@farcaster/auth-kit/styles.css"


const config = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: siteMeta.domain,
  siweUri: `${siteMeta.websiteUrl}/api/retrieveSigner`,
};


export function Auth() {
  return (
    <AuthKitProvider config={config}>
        <SignInButton />      
    </AuthKitProvider>
  );
}

// export function Auth() {
//   const [open, setOpen] = useState(false);

//   return (
//     <AuthKitProvider config={config}>
//       <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//             <Button variant="outline" size="icon">
//               <UserRound className="h-4 w-4" />
//             </Button>
//           </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px] max-w-[375px]">
//         <DialogTitle className="DialogTitle">Login useeeer</DialogTitle>
//           <SignIn />
//         </DialogContent>
//       </Dialog>
//     </AuthKitProvider>
//   );
// }
