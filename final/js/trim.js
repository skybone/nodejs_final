function trim(s){for(;s.length>0&&(" "==s.substr(0,1)||"	"==s.substr(0,1)||"\r"==s.substr(0,1)||"\n"==s.substr(0,1));)s=s.substr(1);for(;s.length>0&&(" "==s.substr(s.length-1,1)||"	"==s.substr(s.length-1,1)||"\r"==s.substr(s.length-1,1)||"\n"==s.substr(s.length-1,1));)s=s.substr(0,s.length-1);return s}