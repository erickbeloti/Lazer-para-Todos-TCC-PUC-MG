package com.projetopuc.lazerparatodos.services;

import com.projetopuc.lazerparatodos.configs.JwtService;
import com.projetopuc.lazerparatodos.dtos.request.LoginRequestDto;
import com.projetopuc.lazerparatodos.dtos.response.LoginResponseDto;
import com.projetopuc.lazerparatodos.entities.Papel;
import com.projetopuc.lazerparatodos.entities.PcD;
import com.projetopuc.lazerparatodos.entities.Proprietario;
import com.projetopuc.lazerparatodos.repositories.PcDRepository;
import com.projetopuc.lazerparatodos.repositories.ProprietarioRepository;
import com.projetopuc.lazerparatodos.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private PcDRepository pcDRepository;

    @Autowired
    private JwtService jwtService;

    public LoginResponseDto autenticar(LoginRequestDto loginRequestDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()
                )
        );
        var usuario = usuarioRepository.findUsuarioByEmail(loginRequestDto.getEmail()).orElseThrow();

        Integer idUsuario = 0;
        String nomeUsuario = "";
        if (usuario.getPapel().equals(Papel.PCD)) {
            PcD pcD = pcDRepository.findByUsuarioId(usuario.getId())
                    .orElse(PcD.builder().build());
            idUsuario = pcD.getId();
            nomeUsuario = pcD.getNome();
        } else if (usuario.getPapel().equals(Papel.PROPRIETARIO)) {
            Proprietario proprietario = proprietarioRepository.findByUsuarioId(usuario.getId())
                    .orElse(Proprietario.builder().build());
            idUsuario = proprietario.getId();
            nomeUsuario = proprietario.getNomeEstabelecimento();
        }

        var jwtToken = jwtService.generateToken(usuario);
        return LoginResponseDto.builder()
                .usuario(
                        LoginResponseDto.Usuario.builder()
                                .id(idUsuario)
                                .nome(nomeUsuario)
                                .email(usuario.getEmail())
                                .papel(usuario.getPapel().name())
                                .build()
                )
                .accessToken(jwtToken)
                .build();
    }
}
