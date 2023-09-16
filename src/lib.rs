use plotters::prelude::*;
use wasm_bindgen::prelude::*;

fn check_syntax(text: &str) -> bool {
    let mut level = 0;
    for c in text.chars() {
        match c {
            '(' => level += 1,
            ')' => {
                level -= 1;
                if level < 0 {
                    return false;
                }
            }
            _ => (),
        };
    }
    level == 0
}

fn draw_impl(text: &str) -> Result<String, Box<dyn std::error::Error>> {
    // Create a 800*600 bitmap and start drawing
    let mut buf = "".to_string();
    let mut backend = SVGBackend::with_string(&mut buf, (800, 600));

    let checks: Vec<bool> = text.lines().map(check_syntax).collect::<Vec<_>>();

    const W: i32 = 10;
    const H: i32 = 10;

    let mut i = 0; // x
    let mut j = 0; // line
    for c in text.chars() {
        use plotters::style::full_palette::*;

        let x = i * W;
        let y = j * H;
        backend.draw_rect(
            (x, y),
            (x + W, y + H),
            match (c, checks[j as usize]) {
                ('(', true) => &BLACK,
                ('(', false) => &GREY_50,
                (')', true) => &RED,
                (')', false) => &RED_50,
                (_, _) => &WHITE,
            },
            true,
        )?;
        i += 1;
        if c == '\n' {
            i = 0;
            j += 1;
        };
    }
    backend.present()?;
    drop(backend);
    Ok(buf)
}

#[wasm_bindgen]
pub fn draw(s: &str) -> String {
    draw_impl(s).unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_chceck_syntax() {
        assert_eq!(check_syntax("("), false);
        assert_eq!(check_syntax("()"), true);
        assert_eq!(check_syntax("())"), false);
    }
}
