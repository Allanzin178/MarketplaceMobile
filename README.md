## Como executar o trabalho

1. Executar npm install
2. Executar npm start

## Como executar API

1. Abra a pasta server cd server
2. Executar npm install
3. Executar npm run dev

## Configuração para testar em dispositivo físico (iOS/Android)

### Passo 1: Descobrir o IP da sua máquina

**Windows:**
```bash
ipconfig
```
Procure por "Endereço IPv4" na seção da sua conexão de rede (geralmente algo como 192.168.x.x)

**Mac/Linux:**
```bash
ifconfig
```
Procure por "inet" na seção da sua conexão de rede

### Passo 2: Configurar o IP no app

1. Abra o arquivo `services/api.ts`
2. Localize a linha:
   ```typescript
   const LOCAL_IP = '192.168.1.100';
   ```
3. Substitua `192.168.1.100` pelo IP da sua máquina
4. Salve o arquivo

### Passo 3: Conectar o dispositivo

**IMPORTANTE:** Seu dispositivo móvel e seu computador devem estar na mesma rede Wi-Fi.

1. Conecte seu dispositivo à mesma rede Wi-Fi do computador
2. Execute o servidor: `cd server && npm run dev`
3. Execute o app: `npm start`
4. Escaneie o QR Code com o Expo Go no seu dispositivo

### Observações:

- O servidor API deve estar rodando na porta 3000
- Se você usar um emulador Android, pode usar `10.0.2.2` ao invés do IP local
- Para iOS Simulator, pode usar `localhost`
