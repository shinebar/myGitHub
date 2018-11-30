package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

//因为是返回页面 所以不能是@RestController
@Controller
@RequestMapping("/freemarker")
public class FreemarkerController {
   
  //正常和springmvc设置返回参数是意义的用法了
  @GetMapping("/map")
  public String index(String name,ModelMap map) {
      map.addAttribute("name", name);
      map.addAttribute("from", "demo.example.cn");
      //模版名称，实际的目录为：src/main/resources/templates/freemarker.html
      return "freemarker";
  }
   
  @GetMapping("/mv")
  public ModelAndView index(String name,ModelAndView mv) {
      mv.addObject("name", name);
      mv.addObject("from", "demo.example.cn");
      mv.setViewName("freemarker");
      //模版名称，实际的目录为：src/main/resources/templates/freemarker.html
      return mv;
  }
}
