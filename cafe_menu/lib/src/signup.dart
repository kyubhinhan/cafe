import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _Signup();
}

class _Signup extends State<Signup> {
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
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
                autofocus: true,
                controller: nameController,
                onEditingComplete: () => {print('edit 끝남')},
                decoration: const InputDecoration(
                    border: UnderlineInputBorder(), labelText: '이름')),
            TextFormField(
                style: TextStyle(decorationThickness: 0),
                controller: emailController,
                decoration: const InputDecoration(
                    border: UnderlineInputBorder(), labelText: '이메일')),
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
