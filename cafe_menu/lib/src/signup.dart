import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _Signup();
}

class _Signup extends State<Signup> {
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
              child: const Text('회원 가입'),
            ),
          ],
        ),
      ),
    );
  }
}
