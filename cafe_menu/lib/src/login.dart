import 'package:flutter/material.dart';
import 'package:cafe_menu/auth.dart';
import 'package:go_router/go_router.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _Login();
}

class _Login extends State<Login> {
  final idController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    idController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    final AuthService auth = AuthService();
    final ButtonStyle style =
        ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 20));
    return Scaffold(
      appBar: AppBar(title: const Text('로그인')),
      body: Center(
        child: SizedBox(
          width: screenWidth * 0.8,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextFormField(
                  style: TextStyle(decorationThickness: 0),
                  controller: idController,
                  decoration: const InputDecoration(
                    border: UnderlineInputBorder(),
                    labelText: '이메일',
                  )),
              TextFormField(
                  controller: passwordController,
                  decoration: const InputDecoration(
                      border: UnderlineInputBorder(), labelText: '비밀번호'),
                  obscureText: true),
              SizedBox(height: 20),
              ElevatedButton(
                style: style,
                onPressed: () async {
                  dynamic credencial = await auth.signInWithEmailPassword(
                      idController.text, passwordController.text);
                  print(credencial);
                },
                child: const Text('로그인'),
              ),
              SizedBox(height: 10),
              InkWell(
                child: const Text(
                  '회원이 아니신가요?',
                  style: TextStyle(
                      color: Colors.blue, decoration: TextDecoration.underline),
                ),
                onTap: () {
                  context.push('/signup');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
