export interface Children {
  children?: JSX.Element;
}

export interface Context {
  toggle?: boolean;
  handleToggle?: () => void;
  handleClose?: () => void;
  signup?: boolean;
  handleSignup?: () => void;
  handleSignupClose?: () => void;
  login?: boolean;
  handleLogin?: () => void;
  handleLoginClose?: () => void;
  miniMenu?: boolean;
  handleMiniMenu?: () => void;
  handleMiniMenuClose?: () => void;
}

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface InvoiceItems {
  id?: string;
  status?: string;
  clientCity?: string;
  clientCountry?: string;
  clientEmail?: string;
  clientName?: string;
  clientPostCode?: string;
  clientStreet?: string;
  createdAt?: string;
  description?: string;
  paymentTerms?: string;
  senderCity?: string;
  senderCountry?: string;
  senderPostCode?: string;
  senderStreet?: string;
  draft?: boolean;
}

export interface PriceItems {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
}
