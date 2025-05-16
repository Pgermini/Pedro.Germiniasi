import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db';  // Importa a conexão com o banco de dados

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Fazendo a consulta para verificar se o usuário já existe
  db.query('SELECT * FROM tbl_users WHERE username = ?', [username], async (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err });

    // Se o usuário já existe, retorna erro
    if (results.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Cria o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere o novo usuário
    db.query(
      'INSERT INTO tbl_users (username, password) VALUES (?, ?)',
      [username, hashedPassword], // Passando os parâmetros corretamente
      (err) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
      }
    );
  });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Consulta para verificar se o usuário existe
  db.query('SELECT * FROM tbl_users WHERE username = ?', [username], async (err, results: any[]) => {
    if (err) return res.status(500).json({ error: err });

    // Se não encontrar o usuário
    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = results[0];

    // Verifica se a senha fornecida é a mesma que a senha hash armazenada
    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
    else
    res.status(201).json({ message: 'Você entrou na pagina'} )
  });
};
