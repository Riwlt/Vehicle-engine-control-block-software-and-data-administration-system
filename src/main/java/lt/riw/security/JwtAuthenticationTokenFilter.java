package lt.riw.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import lt.riw.security.model.JwtAuthenticationToken;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static lt.riw.security.JwtSecurityConstants.HEADER_STRING;
import static lt.riw.security.JwtSecurityConstants.TOKEN_PREFIX;

public class JwtAuthenticationTokenFilter extends AbstractAuthenticationProcessingFilter {

	// Mapping where JWT tokens are required to access
    public JwtAuthenticationTokenFilter() {
        super("/api/**");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {

    	// Grabbing header by header key
        String header = httpServletRequest.getHeader(HEADER_STRING);
        // Checking token prefix
        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            throw new RuntimeException("JWT Token is missing.");
        }

        String authenticationToken = header.substring(6);

        // NullPointer if incorrect request body
        JwtAuthenticationToken token = new JwtAuthenticationToken(authenticationToken);
        return getAuthenticationManager().authenticate(token);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
        chain.doFilter(request, response);
    }
}
