import 'package:flutter/material.dart';
import '../src/signup.dart';

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
    final ButtonStyle style =
        ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 20));
    return Center(
      child: SizedBox(
        width: screenWidth * 0.8,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextFormField(
                style: TextStyle(decorationThickness: 0),
                controller: idController,
                decoration: const InputDecoration(
                    border: UnderlineInputBorder(), labelText: '아이디')),
            TextFormField(
                controller: passwordController,
                decoration: const InputDecoration(
                    border: UnderlineInputBorder(), labelText: '비밀번호'),
                obscureText: true),
            SizedBox(height: 20),
            ElevatedButton(
              style: style,
              onPressed: () {},
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
                Navigator.push(context, MaterialPageRoute<void>(
                  builder: (BuildContext context) {
                    return Scaffold(
                        appBar: AppBar(title: const Text('회원가입')),
                        body: Signup());
                  },
                ));
              },
            ),
          ],
        ),
      ),
    );
  }
}
