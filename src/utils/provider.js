"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";

function Providers({ children }) {
  const [client] = React.useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  );
}

export default Providers;