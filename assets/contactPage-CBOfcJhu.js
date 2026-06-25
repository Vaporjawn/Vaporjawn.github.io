import{u as C,b as ae,j as t,B as c,T as u,d as x,ao as re,ap as xe,p as I,aa as ge,$ as r,ab as $,ae as O,af as _,ag as M,ah as z,V as fe,aK as ye,aL as ve,aM as ke,q as we,aN as Ce,aO as je,E as ie,aP as Se,L as $e,aQ as Ie,a8 as Ee}from"./mui-vendor-CwTETNTU.js";import{c as We,r as l,a as Te}from"./react-vendor-r750OVKV.js";import{S as Oe}from"./SEO-Cu5NWssI.js";import{V as h,c as E,d as m,e as f,f as g,g as te,u as _e}from"./index-C3oeqZK6.js";import{c as Me,a as k,u as ze,C as w,o as Pe}from"./index.esm-CcpewroQ.js";import{F as Ae,z as ne}from"./index-BszSRugl.js";import"./firebase-vendor-jhb7PtHC.js";var A=function(n,a){return A=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])},A(n,a)};function S(n,a){if(typeof a!="function"&&a!==null)throw new TypeError("Class extends value "+String(a)+" is not a constructor or null");A(n,a);function e(){this.constructor=n}n.prototype=a===null?Object.create(a):(e.prototype=a.prototype,new e)}var j=function(){return j=Object.assign||function(a){for(var e,o=1,i=arguments.length;o<i;o++){e=arguments[o];for(var b in e)Object.prototype.hasOwnProperty.call(e,b)&&(a[b]=e[b])}return a},j.apply(this,arguments)};function Le(n,a){a===void 0&&(a={});var e=a.insertAt;if(!(typeof document>"u")){var o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",e==="top"&&o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i),i.styleSheet?i.styleSheet.cssText=n:i.appendChild(document.createTextNode(n))}}var Ne=`/*
  code is extracted from Calendly's embed stylesheet: https://assets.calendly.com/assets/external/widget.css
*/

.calendly-inline-widget,
.calendly-inline-widget *,
.calendly-badge-widget,
.calendly-badge-widget *,
.calendly-overlay,
.calendly-overlay * {
  font-size: 16px;
  line-height: 1.2em;
}

.calendly-inline-widget {
  min-width: 320px;
  height: 630px;
}

.calendly-inline-widget iframe,
.calendly-badge-widget iframe,
.calendly-overlay iframe {
  display: inline;
  width: 100%;
  height: 100%;
}

.calendly-popup-content {
  position: relative;
}

.calendly-popup-content.calendly-mobile {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}

.calendly-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 9999;
  background-color: #a5a5a5;
  background-color: rgba(31, 31, 31, 0.4);
}

.calendly-overlay .calendly-close-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.calendly-overlay .calendly-popup {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  width: 80%;
  min-width: 900px;
  max-width: 1000px;
  height: 90%;
  max-height: 680px;
}

@media (max-width: 975px) {
  .calendly-overlay .calendly-popup {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transform: none;
    transform: none;
    width: 100%;
    height: auto;
    min-width: 0;
    max-height: none;
  }
}

.calendly-overlay .calendly-popup .calendly-popup-content {
  height: 100%;
}

.calendly-overlay .calendly-popup-close {
  position: absolute;
  top: 25px;
  right: 25px;
  color: #fff;
  width: 19px;
  height: 19px;
  cursor: pointer;
  background: url(https://assets.calendly.com/assets/external/close-icon.svg)
    no-repeat;
  background-size: contain;
}

@media (max-width: 975px) {
  .calendly-overlay .calendly-popup-close {
    top: 15px;
    right: 15px;
  }
}

.calendly-badge-widget {
  position: fixed;
  right: 20px;
  bottom: 15px;
  z-index: 9998;
}

.calendly-badge-widget .calendly-badge-content {
  display: table-cell;
  width: auto;
  height: 45px;
  padding: 0 30px;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 2px 5px;
  font-family: sans-serif;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}

.calendly-badge-widget .calendly-badge-content.calendly-white {
  color: #666a73;
}

.calendly-badge-widget .calendly-badge-content span {
  display: block;
  font-size: 12px;
}

.calendly-spinner {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
  z-index: -1;
}

.calendly-spinner > div {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #e1e1e1;
  border-radius: 50%;
  vertical-align: middle;
  -webkit-animation: calendly-bouncedelay 1.4s infinite ease-in-out;
  animation: calendly-bouncedelay 1.4s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.calendly-spinner .calendly-bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.calendly-spinner .calendly-bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes calendly-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes calendly-bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
`;Le(Ne);function P(n){return n.charAt(0)==="#"?n.slice(1):n}function Fe(n){return n?.primaryColor&&(n.primaryColor=P(n.primaryColor)),n?.textColor&&(n.textColor=P(n.textColor)),n?.backgroundColor&&(n.backgroundColor=P(n.backgroundColor)),n}var oe;(function(n){n.PROFILE_PAGE_VIEWED="calendly.profile_page_viewed",n.EVENT_TYPE_VIEWED="calendly.event_type_viewed",n.DATE_AND_TIME_SELECTED="calendly.date_and_time_selected",n.EVENT_SCHEDULED="calendly.event_scheduled",n.PAGE_HEIGHT="calendly.page_height"})(oe||(oe={}));var le=function(n){var a=n.url,e=n.prefill,o=e===void 0?{}:e,i=n.pageSettings,b=i===void 0?{}:i,p=n.utm,y=p===void 0?{}:p,d=n.embedType,s=Fe(b),N=s.backgroundColor,de=s.hideEventTypeDetails,ce=s.hideLandingPageDetails,F=s.primaryColor,R=s.textColor,pe=s.hideGdprBanner,B=o.customAnswers,W=o.date,q=o.email,G=o.firstName,D=o.guests,U=o.lastName,H=o.location,Y=o.name,V=y.utmCampaign,Q=y.utmContent,J=y.utmMedium,X=y.utmSource,K=y.utmTerm,Z=y.salesforce_uuid,T=a.indexOf("?"),ee=T>-1,ue=a.slice(T+1),me=ee?a.slice(0,T):a,he=[ee?ue:null,N?"background_color=".concat(N):null,de?"hide_event_type_details=1":null,ce?"hide_landing_page_details=1":null,F?"primary_color=".concat(F):null,R?"text_color=".concat(R):null,pe?"hide_gdpr_banner=1":null,Y?"name=".concat(encodeURIComponent(Y)):null,H?"location=".concat(encodeURIComponent(H)):null,G?"first_name=".concat(encodeURIComponent(G)):null,U?"last_name=".concat(encodeURIComponent(U)):null,D?"guests=".concat(D.map(encodeURIComponent).join(",")):null,q?"email=".concat(encodeURIComponent(q)):null,W&&W instanceof Date?"date=".concat(Re(W)):null,V?"utm_campaign=".concat(encodeURIComponent(V)):null,Q?"utm_content=".concat(encodeURIComponent(Q)):null,J?"utm_medium=".concat(encodeURIComponent(J)):null,X?"utm_source=".concat(encodeURIComponent(X)):null,K?"utm_term=".concat(encodeURIComponent(K)):null,Z?"salesforce_uuid=".concat(encodeURIComponent(Z)):null,d?"embed_type=".concat(d):null,"embed_domain=1"].concat(B?qe(B):[]).filter(function(be){return be!==null}).join("&");return"".concat(me,"?").concat(he)},Re=function(n){var a=n.getMonth()+1,e=n.getDate(),o=n.getFullYear();return[o,a<10?"0".concat(a):a,e<10?"0".concat(e):e].join("-")},Be=/^a\d{1,2}$/,qe=function(n){var a=Object.keys(n).filter(function(e){return e.match(Be)});return a.length?a.map(function(e){return"".concat(e,"=").concat(encodeURIComponent(n[e]))}):[]},se=(function(n){S(a,n);function a(){return n!==null&&n.apply(this,arguments)||this}return a.prototype.render=function(){return l.createElement("div",{className:"calendly-spinner"},l.createElement("div",{className:"calendly-bounce1"}),l.createElement("div",{className:"calendly-bounce2"}),l.createElement("div",{className:"calendly-bounce3"}))},a})(l.Component),Ge="calendly-inline-widget";(function(n){S(a,n);function a(e){var o=n.call(this,e)||this;return o.state={isLoading:!0},o.onLoad=o.onLoad.bind(o),o}return a.prototype.onLoad=function(){this.setState({isLoading:!1})},a.prototype.render=function(){var e=le({url:this.props.url,pageSettings:this.props.pageSettings,prefill:this.props.prefill,utm:this.props.utm,embedType:"Inline"}),o=this.props.LoadingSpinner||se;return l.createElement("div",{className:this.props.className||Ge,style:this.props.styles||{}},this.state.isLoading&&l.createElement(o,null),l.createElement("iframe",{width:"100%",height:"100%",frameBorder:"0",title:this.props.iframeTitle||"Calendly Scheduling Page",onLoad:this.onLoad,src:e}))},a})(l.Component);var De=(function(n){S(a,n);function a(e){var o=n.call(this,e)||this;return o.state={isLoading:!0},o.onLoad=o.onLoad.bind(o),o}return a.prototype.onLoad=function(){this.setState({isLoading:!1})},a.prototype.render=function(){var e=le({url:this.props.url,pageSettings:this.props.pageSettings,prefill:this.props.prefill,utm:this.props.utm,embedType:"Inline"}),o=this.props.LoadingSpinner||se;return l.createElement(l.Fragment,null,this.state.isLoading&&l.createElement(o,null),l.createElement("iframe",{width:"100%",height:"100%",frameBorder:"0",title:this.props.iframeTitle||"Calendly Scheduling Page",onLoad:this.onLoad,src:e}))},a})(l.Component),L=(function(n){if(!n.open)return null;if(!n.rootElement)throw new Error("[react-calendly]: PopupModal rootElement property cannot be undefined");return We.createPortal(l.createElement("div",{className:"calendly-overlay"},l.createElement("div",{onClick:n.onModalClose,className:"calendly-close-overlay"}),l.createElement("div",{className:"calendly-popup"},l.createElement("div",{className:"calendly-popup-content"},l.createElement(De,j({},n)))),l.createElement("button",{className:"calendly-popup-close",onClick:n.onModalClose,"aria-label":"Close modal",style:{display:"block",border:"none",padding:0}})),n.rootElement)});(function(n){S(a,n);function a(e){var o=n.call(this,e)||this;return o.state={isOpen:!1},o.onClick=o.onClick.bind(o),o.onClose=o.onClose.bind(o),o}return a.prototype.onClick=function(e){e.preventDefault(),this.setState({isOpen:!0})},a.prototype.onClose=function(e){e.stopPropagation(),this.setState({isOpen:!1})},a.prototype.render=function(){return l.createElement(l.Fragment,null,l.createElement("button",{onClick:this.onClick,style:this.props.styles||{},className:this.props.className||""},this.props.text),l.createElement(L,j({},this.props,{open:this.state.isOpen,onModalClose:this.onClose,rootElement:this.props.rootElement})))},a})(l.Component);(function(n){S(a,n);function a(e){var o=n.call(this,e)||this;return o.state={isOpen:!1},o.onClick=o.onClick.bind(o),o.onClose=o.onClose.bind(o),o}return a.prototype.onClick=function(){this.setState({isOpen:!0})},a.prototype.onClose=function(e){e.stopPropagation(),this.setState({isOpen:!1})},a.prototype.render=function(){return l.createElement("div",{className:"calendly-badge-widget",onClick:this.onClick},l.createElement("div",{className:"calendly-badge-content",style:{background:this.props.color||"#00a2ff",color:this.props.textColor||"#ffffff"}},this.props.text||"Schedule time with me",this.props.branding&&l.createElement("span",null,"powered by Calendly")),l.createElement(L,j({},this.props,{open:this.state.isOpen,onModalClose:this.onClose,rootElement:this.props.rootElement})))},a})(l.Component);const Ue=()=>{const n=C(),a=ae(n.breakpoints.down("md"));return t.jsxs(c,{sx:{textAlign:"center",mb:8},children:[t.jsx(u,{variant:a?"h3":"h2",sx:{fontWeight:"bold",background:`linear-gradient(45deg, ${h}, ${E})`,backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",mb:2,textShadow:`0 0 30px ${h}30`},children:"Let's Work Together"}),t.jsx(u,{variant:"h6",sx:{color:n.palette.text.secondary,maxWidth:600,mx:"auto",lineHeight:1.6},children:"Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life."})]})},He=({contactMethods:n,onScheduleClick:a})=>{const e=C();ae(e.breakpoints.down("md"));const o=i=>{i.title==="Schedule a Call"?a():window.open(i.link,"_blank")};return t.jsx(t.Fragment,{children:t.jsxs(c,{sx:{mb:10},children:[t.jsx(u,{variant:"h4",sx:{textAlign:"center",mb:2,fontWeight:"bold",background:`linear-gradient(45deg, ${m}, ${f})`,backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:{xs:"1.75rem",md:"2.125rem"}},children:"Choose Your Preferred Method"}),t.jsx(u,{variant:"body1",sx:{textAlign:"center",color:e.palette.text.secondary,mb:7,fontSize:{xs:"0.95rem",md:"1.05rem"},maxWidth:700,mx:"auto",lineHeight:1.7},children:"Select the most convenient way to reach out, and I'll get back to you as soon as possible."}),t.jsx(x,{container:!0,spacing:{xs:3,md:1},justifyContent:"center",sx:{maxWidth:1100,mx:"auto",flexWrap:{md:"nowrap"}},children:n.map((i,b)=>t.jsx(x,{size:{xs:12,sm:12,md:4,lg:4},children:t.jsx(re,{sx:{height:"100%",minHeight:{xs:"auto",md:"380px"},background:e.palette.mode==="dark"?`linear-gradient(145deg, ${i.color}18, ${g}12, transparent)`:`linear-gradient(145deg, ${i.color}12, ${g}08, transparent)`,backdropFilter:"blur(25px)",border:`2px solid ${i.color}25`,borderRadius:4,transition:"all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",cursor:"pointer",position:"relative",overflow:"hidden",boxShadow:`0 8px 32px ${i.color}15`,"&::before":{content:'""',position:"absolute",top:0,left:0,right:0,bottom:0,background:`radial-gradient(circle at 50% 0%, ${i.color}20, transparent 70%)`,opacity:0,transition:"opacity 0.4s ease"},"&:hover":{transform:"translateY(-12px) scale(1.02)",boxShadow:`0 24px 48px ${i.color}35, 0 0 60px ${i.color}20`,border:`2px solid ${i.color}60`,"&::before":{opacity:1},"& .icon-circle":{transform:"scale(1.1) rotate(5deg)",boxShadow:`0 15px 40px ${i.color}60`},"& .card-button":{background:`${i.color}20`,borderColor:i.color,transform:"translateY(-2px)"}}},onClick:()=>o(i),children:t.jsxs(xe,{sx:{p:{xs:3,md:4.5},textAlign:"center",position:"relative",zIndex:1},children:[t.jsx(c,{className:"icon-circle",sx:{width:{xs:90,md:100},height:{xs:90,md:100},borderRadius:"50%",background:`linear-gradient(135deg, ${i.color}, ${E})`,display:"flex",alignItems:"center",justifyContent:"center",mx:"auto",mb:3.5,color:"white",boxShadow:`0 12px 35px ${i.color}50`,transition:"all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",border:`3px solid ${e.palette.mode==="dark"?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.3)"}`},children:Te.cloneElement(i.icon,{sx:{fontSize:{xs:36,md:40}}})}),t.jsx(u,{variant:"h5",sx:{fontWeight:"bold",mb:1.5,color:e.palette.text.primary,fontSize:{xs:"1.35rem",md:"1.5rem"},letterSpacing:"-0.01em"},children:i.title}),t.jsx(u,{variant:"body2",sx:{color:e.palette.text.secondary,mb:4,fontSize:{xs:"0.9rem",md:"0.95rem"},lineHeight:1.6,minHeight:{xs:"auto",md:"48px"}},children:i.description}),t.jsx(I,{className:"card-button",variant:"outlined",endIcon:t.jsx(ge,{sx:{fontSize:16}}),sx:{borderColor:`${i.color}60`,color:i.color,fontWeight:"600",px:2.5,py:1.5,borderRadius:2.5,fontSize:{xs:"0.8rem",md:"0.875rem"},textTransform:"none",letterSpacing:"0.02em",borderWidth:2,transition:"all 0.3s ease",width:"100%",maxWidth:"100%",minHeight:{xs:"44px",md:"48px"},lineHeight:1.4,display:"flex",alignItems:"center",justifyContent:"center","& .MuiButton-endIcon":{ml:1,flexShrink:0},"&:hover":{borderColor:i.color,borderWidth:2}},children:t.jsx(c,{component:"span",sx:{overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",wordBreak:"break-all"},children:i.action})})]})})},b))})]})})},Ye=Me().shape({name:k().required("Name is required").min(2,"Name must be at least 2 characters"),email:k().required("Email is required").email("Invalid email address"),subject:k().required("Subject is required").min(5,"Subject must be at least 5 characters"),projectType:k().required("Project type is required"),budget:k(),timeline:k(),message:k().required("Message is required").min(20,"Message must be at least 20 characters")}),Ve=[{value:"web-development",label:"Web Development"},{value:"mobile-app",label:"Mobile App"},{value:"full-stack",label:"Full Stack Application"},{value:"consulting",label:"Consulting"},{value:"maintenance",label:"Maintenance & Support"},{value:"other",label:"Other"}],Qe=[{value:"less-than-5k",label:"Less than $5,000"},{value:"5k-10k",label:"$5,000 - $10,000"},{value:"10k-25k",label:"$10,000 - $25,000"},{value:"25k-50k",label:"$25,000 - $50,000"},{value:"50k-plus",label:"$50,000+"},{value:"not-sure",label:"Not Sure"}],Je=[{value:"asap",label:"ASAP"},{value:"1-3-months",label:"1-3 Months"},{value:"3-6-months",label:"3-6 Months"},{value:"6-plus-months",label:"6+ Months"},{value:"flexible",label:"Flexible"}],Xe={name:"",email:"",subject:"",projectType:"",budget:"",timeline:"",message:""},Ke="https://formspree.io/f/your-form-id",v={success:{message:"Thank you! I'll get back to you within 24-48 hours.",duration:4e3,position:"top-center",style:{background:"#10b981",color:"#fff",fontWeight:600}},error:{message:"Something went wrong. Please try again or email me directly.",duration:5e3,position:"top-center",style:{background:"#ef4444",color:"#fff",fontWeight:600}}},Ze=()=>{const[n,a]=l.useState(!1),e=C(),{control:o,handleSubmit:i,reset:b,formState:{errors:p}}=ze({resolver:Pe(Ye),defaultValues:Xe}),y=async d=>{a(!0);try{if((await fetch(Ke,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})).ok)ne.success(v.success.message,{duration:v.success.duration,position:v.success.position,style:v.success.style}),te(!0),b();else throw new Error("Form submission failed")}catch(s){console.error("Contact form error:",s),ne.error(v.error.message,{duration:v.error.duration,position:v.error.position,style:v.error.style}),te(!1)}finally{a(!1)}};return t.jsxs(t.Fragment,{children:[t.jsx(Ae,{}),t.jsxs(re,{elevation:0,sx:{position:"relative",borderRadius:4,background:r(e.palette.background.paper,.85),backdropFilter:"blur(20px)",border:`1px solid ${r(e.palette.primary.main,.2)}`,overflow:"hidden",transition:"all 0.4s cubic-bezier(0.4, 0, 0.2, 1)","@media (prefers-reduced-motion: reduce)":{transition:"none"},"&:hover":{borderColor:r(e.palette.primary.main,.4),boxShadow:`0 20px 60px ${r(e.palette.primary.main,.25)}`}},children:[t.jsxs(c,{sx:{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0},children:[t.jsx(c,{sx:{position:"absolute",top:-100,left:-100,width:300,height:300,borderRadius:"50%",background:`radial-gradient(circle, ${r(e.palette.vaporwave.pink,.25)} 0%, transparent 70%)`,filter:"blur(60px)"}}),t.jsx(c,{sx:{position:"absolute",bottom:-120,right:-120,width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle, ${r(e.palette.vaporwave.blue,.2)} 0%, transparent 70%)`,filter:"blur(70px)"}}),t.jsx(c,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:250,height:250,borderRadius:"50%",background:`radial-gradient(circle, ${r(e.palette.vaporwave.purple,.15)} 0%, transparent 70%)`,filter:"blur(80px)"}})]}),t.jsxs(c,{component:"form",onSubmit:i(y),noValidate:!0,sx:{position:"relative",zIndex:1,p:{xs:3,md:5}},children:[t.jsxs(x,{container:!0,spacing:3,children:[t.jsx(x,{size:{xs:12,sm:6},children:t.jsx(w,{name:"name",control:o,render:({field:d})=>t.jsx($,{...d,fullWidth:!0,label:"Your Name",error:!!p.name,helperText:p.name?.message,variant:"outlined",sx:{"& .MuiOutlinedInput-root":{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& fieldset":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover fieldset":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& fieldset":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}}}})})}),t.jsx(x,{size:{xs:12,sm:6},children:t.jsx(w,{name:"email",control:o,render:({field:d})=>t.jsx($,{...d,fullWidth:!0,label:"Email Address",type:"email",error:!!p.email,helperText:p.email?.message,variant:"outlined",sx:{"& .MuiOutlinedInput-root":{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& fieldset":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover fieldset":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& fieldset":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}}}})})}),t.jsx(x,{size:12,children:t.jsx(w,{name:"subject",control:o,render:({field:d})=>t.jsx($,{...d,fullWidth:!0,label:"Subject",error:!!p.subject,helperText:p.subject?.message,variant:"outlined",sx:{"& .MuiOutlinedInput-root":{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& fieldset":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover fieldset":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& fieldset":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}}}})})}),t.jsx(x,{size:{xs:12,sm:4},children:t.jsx(w,{name:"projectType",control:o,render:({field:d})=>t.jsxs(O,{fullWidth:!0,error:!!p.projectType,children:[t.jsx(_,{children:"Project Type"}),t.jsx(M,{...d,label:"Project Type",sx:{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& .MuiOutlinedInput-notchedOutline":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& .MuiOutlinedInput-notchedOutline":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}},children:Ve.map(s=>t.jsx(z,{value:s.value,children:s.label},s.value))}),p.projectType&&t.jsx(u,{variant:"caption",color:"error",sx:{mt:.5,ml:2},children:p.projectType.message})]})})}),t.jsx(x,{size:{xs:12,sm:4},children:t.jsx(w,{name:"budget",control:o,render:({field:d})=>t.jsxs(O,{fullWidth:!0,children:[t.jsx(_,{children:"Budget Range"}),t.jsx(M,{...d,label:"Budget Range",sx:{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& .MuiOutlinedInput-notchedOutline":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& .MuiOutlinedInput-notchedOutline":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}},children:Qe.map(s=>t.jsx(z,{value:s.value,children:s.label},s.value))})]})})}),t.jsx(x,{size:{xs:12,sm:4},children:t.jsx(w,{name:"timeline",control:o,render:({field:d})=>t.jsxs(O,{fullWidth:!0,children:[t.jsx(_,{children:"Timeline"}),t.jsx(M,{...d,label:"Timeline",sx:{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& .MuiOutlinedInput-notchedOutline":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& .MuiOutlinedInput-notchedOutline":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}},children:Je.map(s=>t.jsx(z,{value:s.value,children:s.label},s.value))})]})})}),t.jsx(x,{size:12,children:t.jsx(w,{name:"message",control:o,render:({field:d})=>t.jsx($,{...d,fullWidth:!0,label:"Project Description",multiline:!0,rows:6,error:!!p.message,helperText:p.message?.message||"Please provide details about your project",variant:"outlined",sx:{"& .MuiOutlinedInput-root":{background:r(e.palette.background.paper,.5),transition:"all 0.3s ease","& fieldset":{borderColor:r(e.palette.primary.main,.3),borderWidth:"1.5px"},"&:hover fieldset":{borderColor:r(e.palette.vaporwave.pink,.6)},"&.Mui-focused":{background:r(e.palette.background.paper,.7),boxShadow:`0 0 0 3px ${r(e.palette.vaporwave.blueGreen,.2)}`,"& fieldset":{borderColor:e.palette.vaporwave.blueGreen,borderWidth:"2px"}}}}})})}),t.jsx(x,{size:12,children:t.jsx(I,{type:"submit",variant:"contained",size:"large",disabled:n,startIcon:n?t.jsx(fe,{size:20}):t.jsx(ye,{}),fullWidth:!0,sx:{py:1.5,minHeight:"56px",fontSize:"1.1rem",fontWeight:600,background:`linear-gradient(135deg, ${e.palette.vaporwave.purple} 0%, ${e.palette.vaporwave.pink} 50%, ${e.palette.vaporwave.blue} 100%)`,boxShadow:`0 4px 12px ${r(e.palette.vaporwave.purple,.3)}`,transition:"all 0.3s ease",position:"relative",overflow:"hidden","&:hover":{transform:"translateY(-2px)",boxShadow:`0 8px 20px ${r(e.palette.vaporwave.purple,.5)}`,background:`linear-gradient(135deg, ${e.palette.vaporwave.purple} 0%, ${e.palette.vaporwave.pink} 50%, ${e.palette.vaporwave.blueGreen} 100%)`},"&:active":{transform:"translateY(0)"},"&:disabled":{background:r(e.palette.action.disabled,.3),color:e.palette.text.disabled},"@media (prefers-reduced-motion: reduce)":{transition:"none","&:hover":{transform:"none"}}},children:n?"Sending...":"Send Message"})})]}),t.jsx(c,{sx:{mt:4,textAlign:"center",p:3,background:r(e.palette.background.paper,.6),borderRadius:2,border:`1px solid ${r(e.palette.primary.main,.2)}`,transition:"all 0.3s ease","&:hover":{background:r(e.palette.background.paper,.8),borderColor:r(e.palette.vaporwave.pink,.4)}},children:t.jsxs(u,{variant:"body2",color:"text.secondary",children:["Or email me directly at"," ",t.jsx(c,{component:"a",href:"mailto:victor.williams.dev@gmail.com",sx:{color:e.palette.vaporwave.blueGreen,fontWeight:600,textDecoration:"none",borderBottom:`2px solid ${r(e.palette.vaporwave.blueGreen,.3)}`,transition:"all 0.3s ease","&:hover":{color:e.palette.vaporwave.pink,borderBottomColor:e.palette.vaporwave.pink}},children:"victor.williams.dev@gmail.com"})]})})]})]})]})},et=()=>{const n=C();return t.jsxs(c,{sx:{mb:10},children:[t.jsx(u,{variant:"h4",sx:{textAlign:"center",mb:2,fontWeight:"bold",background:`linear-gradient(45deg, ${h}, ${f})`,backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontSize:{xs:"1.75rem",md:"2.125rem"},textShadow:`0 0 30px ${r(h,.3)}`,letterSpacing:"0.5px"},children:"Send Me a Message"}),t.jsx(u,{variant:"body1",sx:{textAlign:"center",color:n.palette.text.secondary,mb:5,fontSize:{xs:"0.95rem",md:"1.05rem"},maxWidth:700,mx:"auto",lineHeight:1.7},children:"Fill out the form below and I'll get back to you within 24-48 hours."}),t.jsx(c,{sx:{maxWidth:800,mx:"auto"},children:t.jsx(Ze,{})})]})},tt=({faqs:n})=>{const a=C();return t.jsxs(c,{id:"faq",sx:{mb:8,scrollMarginTop:"120px"},children:[t.jsx(u,{variant:"h4",sx:{textAlign:"center",mb:1,fontWeight:"bold",background:`linear-gradient(45deg, ${g}, ${h})`,backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Frequently Asked Questions"}),t.jsx(u,{variant:"body1",sx:{textAlign:"center",color:a.palette.text.secondary,mb:6},children:"Find answers to common inquiries about my services and processes."}),t.jsx(c,{sx:{maxWidth:900,mx:"auto"},children:n.map((e,o)=>t.jsxs(ve,{sx:{mb:2,background:a.palette.mode==="dark"?`linear-gradient(135deg, ${m}10, ${g}10)`:`linear-gradient(135deg, ${m}05, ${g}05)`,backdropFilter:"blur(10px)",border:`1px solid ${g}20`,borderRadius:2,"&:before":{display:"none"},"&.Mui-expanded":{border:`1px solid ${g}40`,boxShadow:`0 8px 25px ${g}20`}},children:[t.jsxs(ke,{expandIcon:t.jsx(Ce,{sx:{color:E}}),sx:{"& .MuiAccordionSummary-content":{alignItems:"center",gap:2}},children:[t.jsx(we,{label:e.category,size:"small",sx:{background:`linear-gradient(45deg, ${f}, ${E})`,color:m,fontWeight:"bold",fontSize:"0.75rem"}}),t.jsx(u,{variant:"h6",sx:{fontWeight:"600",color:a.palette.text.primary},children:e.question})]}),t.jsx(je,{children:t.jsx(u,{variant:"body1",sx:{color:a.palette.text.secondary,lineHeight:1.7,pl:2},children:e.answer})})]},o))})]})},nt=({email:n,onScheduleClick:a})=>{const e=C();return t.jsxs(c,{sx:{textAlign:"center",py:8,background:e.palette.mode==="dark"?`linear-gradient(135deg, ${m}10, ${h}10)`:`linear-gradient(135deg, ${m}05, ${h}05)`,borderRadius:4,border:`1px solid ${m}20`},children:[t.jsx(u,{variant:"h4",sx:{mb:2,fontWeight:"bold",background:`linear-gradient(45deg, ${m}, ${f})`,backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"Ready to Get Started?"}),t.jsx(u,{variant:"body1",sx:{mb:4,color:e.palette.text.secondary,maxWidth:600,mx:"auto"},children:"Choose the communication method that works best for you. I'm here to help bring your ideas to life."}),t.jsxs(c,{sx:{display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap"},children:[t.jsx(I,{variant:"contained",size:"large",href:`mailto:${n}`,startIcon:t.jsx(ie,{}),sx:{background:`linear-gradient(45deg, ${m}, ${h})`,color:"#fff",fontWeight:"bold",px:4,py:1.5,borderRadius:2,boxShadow:`0 4px 20px ${m}30`,transition:"all 0.3s ease","&:hover":{background:`linear-gradient(45deg, ${h}, ${m})`,boxShadow:`0 6px 30px ${h}40`,transform:"translateY(-2px)"}},children:"Send Email"}),t.jsx(I,{variant:"outlined",size:"large",onClick:a,startIcon:t.jsx(Se,{}),sx:{borderColor:f,color:f,fontWeight:"bold",px:4,py:1.5,borderRadius:2,borderWidth:2,transition:"all 0.3s ease","&:hover":{borderColor:f,borderWidth:2,background:`${f}10`,transform:"translateY(-2px)",boxShadow:`0 4px 20px ${f}20`}},children:"Schedule Meeting"})]})]})},ot=n=>[{title:"Email",description:"Send me an email anytime",action:n,icon:t.jsx(ie,{sx:{fontSize:32}}),color:h,link:`mailto:${n}`},{title:"LinkedIn",description:"Connect with me professionally",action:"/in/victorwilliams",icon:t.jsx($e,{sx:{fontSize:32}}),color:m,link:"https://linkedin.com/in/victorwilliams"},{title:"Schedule a Call",description:"Book a 15-min intro call",action:"calendly.com/victor-williams-dev",icon:t.jsx(Ie,{sx:{fontSize:32}}),color:f,link:"https://calendly.com/victor-williams-dev/introductory-call"}],at=[{question:"What do you actually do as a software engineer?",answer:"I build full-stack systems end to end—frontend, backend, infra, and the glue in between. Web, mobile, cloud, APIs, CI/CD. If it ships, scales, and survives production, I've probably touched it.",category:"role"},{question:"What level are you operating at right now?",answer:"Senior+ territory. I've led teams, owned architectures, mentored engineers, and stepped into roles like Tech Lead, Project Manager, Solutions Architect, and DevOps when the situation demanded it. Titles flex; responsibility doesn't.",category:"experience"},{question:"What kind of problems do you like solving?",answer:'Messy ones. Legacy systems, tech debt, scaling bottlenecks, unclear requirements, and "this needs to work yesterday." I specialize in turning chaos into systems that people can actually rely on.',category:"expertise"},{question:"What industries have you worked in?",answer:"Fintech, food tech, marketplaces, enterprise platforms, SaaS, and internal tooling. From banking services to restaurant POS integrations to Fortune 500 testing platforms. Variety sharpened the blade.",category:"background"},{question:"What's your strongest technical stack?",answer:"Modern JavaScript/TypeScript ecosystems (React, Node), plus .NET, Go, Python, Java, SQL/Postgres, Docker, and cloud platforms like AWS and Azure. I adapt fast, but I don't fake fundamentals.",category:"technical"},{question:"Do you prefer frontend or backend?",answer:"Both. Frontend for user empathy and experience. Backend for power, scale, and correctness. Full-stack isn't a buzzword to me—it's leverage.",category:"specialization"},{question:"What separates you from other senior engineers?",answer:"I think in systems, not tickets. I care about business impact, team velocity, and long-term maintainability—not just getting green checkmarks in Jira. I fix root causes instead of babysitting symptoms.",category:"differentiator"},{question:"Have you led or managed other engineers?",answer:"Yes. I've led teams, mentored juniors, coordinated across countries, and reduced operational load (like cutting open tickets by 87%). Leadership to me means making everyone else better.",category:"leadership"},{question:"What kind of environments do you thrive in?",answer:"High-trust, high-ownership environments. Places where engineers are expected to think, not just execute. I do best where clarity, accountability, and ambition coexist.",category:"culture"},{question:"What are you looking for next?",answer:"Work that matters. Teams that value craftsmanship. Problems that stretch me. I'm not chasing hype—I'm building durable things with people who care about doing it right.",category:"opportunity"}],ut=()=>{const n=C(),{personalInfo:a}=_e(),[e,o]=l.useState(!1);l.useEffect(()=>{const{hash:b}=window.location;b==="#faq"&&setTimeout(()=>{const p=document.getElementById("faq");if(p){const d=p.getBoundingClientRect().top+window.pageYOffset+-100;window.scrollTo({top:d,behavior:"smooth"})}},100)},[]);const i=ot(a.email);return t.jsxs(t.Fragment,{children:[t.jsx(Oe,{title:"Contact - Let's Work Together",description:"Have a project in mind? Let's discuss how we can bring your ideas to life. Multiple ways to connect and comprehensive FAQ about development services.",keywords:"contact, web development, consultation, project inquiry, technical consulting"}),t.jsxs(c,{sx:{minHeight:"100vh",background:n.palette.mode==="dark"?`linear-gradient(135deg, ${m}15, ${g}15, ${h}10)`:`linear-gradient(135deg, ${m}08, ${g}08, ${h}05)`,position:"relative",overflow:"hidden"},children:[t.jsx(c,{sx:{position:"absolute",top:0,left:0,right:0,bottom:0,background:`radial-gradient(circle at 20% 20%, ${h}20 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, ${m}20 0%, transparent 50%),
                        radial-gradient(circle at 40% 60%, ${g}15 0%, transparent 50%)`,zIndex:0}}),t.jsxs(Ee,{maxWidth:"lg",sx:{position:"relative",zIndex:1,py:{xs:6,md:10}},children:[t.jsx(Ue,{}),t.jsx(He,{contactMethods:i,onScheduleClick:()=>o(!0)}),t.jsx(et,{}),t.jsx(tt,{faqs:at}),t.jsx(nt,{email:a.email,onScheduleClick:()=>o(!0)})]})]}),t.jsx(L,{url:"https://calendly.com/victor-williams-dev/introductory-call",onModalClose:()=>o(!1),open:e,rootElement:document.getElementById("root")??document.body})]})};export{ut as default};
//# sourceMappingURL=contactPage-CBOfcJhu.js.map
